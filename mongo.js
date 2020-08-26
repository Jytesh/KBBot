require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const refreshRate = 600000;

module.exports = {
    init: async function() {
        await client.connect();
    },
    market: {
        hasActiveBid: async function(id, tag) {
            const reply = await client.db('bid').collection('users').findOne({ uid: { $eq: id } }).catch(console.error);

            if (reply) return reply.hasActiveBid;

            const insertReply = await client.db('bid').collection('users').updateOne({ uid: { $eq: id } }, {
                $set: {
                    uid: id,
                    user: tag,
                    hasActiveBid: false
                }
            }, { upsert: true }).catch(console.error);

            if (insertReply) return false;
            return -1;
        },
        createNewBid: async function(id, bidDetails) {
            const curBid = await this.increaseBidID('curBidID');
            if (curBid == -1) return -1;
            const reply = await client.db('bid').collection('bids').updateOne({ bid: { $eq: curBid } }, {
                $set: {
                    bid: curBid,
                    active: true,
                    curVal: bidDetails.start,
                    min: bidDetails.min,
                    start: bidDetails.start,
                    uid: id,
                    url: bidDetails.url,
                    lastMsgID: -1
                }
            }, { upsert: true });

            if (reply) {
                const userReply = await client.db('bid').collection('users').updateOne({ uid: { $eq: id } }, {
                    $set: {
                        uid: id,
                        hasActiveBid: true,
                        bid: curBid
                    }
                }, { upsert: true }).catch(console.error);

                if (userReply) {
                    const newBid = await client.db('bid').collection('bids').findOne({ bid: { $eq: curBid } });

                    if (newBid) return {
                        bid: newBid.bid,
                        active: newBid.active,
                        curVal: newBid.start,
                        min: newBid.min,
                        start: newBid.start,
                        uid: newBid.uid,
                        url: newBid.url
                    };
                    return -1;
                }
                return -1;
            }
            return -1;
        },
        finaliseBid: async function(id) {
            const userBid = await this.getUserBid(id);
            var pastBidsArr = await this.getPastBidsOfUserByID(id);

            if (userBid == -1) return -1;

            if (pastBidsArr == undefined) pastBidsArr = [userBid];
            else pastBidsArr.push(userBid);

            const reply = await client.db('bid').collection('bids').updateOne({ bid: { $eq: userBid } }, {
                $set: {
                    bid: userBid,
                    active: false,
                }
            }, { upsert: true });

            if (reply) {
                const userReply = await client.db('bid').collection('users').updateOne({ uid: { $eq: id } }, {
                    $set: {
                        uid: id,
                        hasActiveBid: false,
                        bid: -1,
                        pastBids: pastBidsArr
                    }
                }, { upsert: true }).catch(console.error);


                if (userReply) {
                    const closedBid = await client.db('bid').collection('bids').findOne({ bid: { $eq: userBid } });

                    if (closedBid) return {
                        bid: closedBid.bid,
                        active: closedBid.active,
                        curVal: closedBid.curVal,
                        min: closedBid.min,
                        start: closedBid.start,
                        bidder: closedBid.bidder,
                        uid: closedBid.uid,
                        url: closedBid.url
                    };
                    return -1;
                }
                return -1;
            }
            return -1;
        },
        updateBid: async function(id, uid, val) {
            const exists = await this.bidExists(id);
            if (exists == -1) return -1;

            const reply = await client.db('bid').collection('bids').updateOne({ bid: { $eq: id } }, {
                $set: {
                    bid: id,
                    bidder: uid,
                    curVal: val
                }
            }, { upsert: true });

            if (reply) {
                const updatedBid = await client.db('bid').collection('bids').findOne({ bid: { $eq: id } });

                if (updatedBid) return {
                    bid: updatedBid.bid,
                    active: updatedBid.active,
                    curVal: updatedBid.curVal,
                    min: updatedBid.min,
                    start: updatedBid.start,
                    bidder: updatedBid.bidder,
                    uid: updatedBid.uid,
                    url: updatedBid.url,
                    lastMsgID: updatedBid.lastMsgID
                }
            }
            return -1;
        },
        getCurBid: async function(id) {
            const reply = await client.db('bid').collection('system').findOne({ _id: { $eq: id } }).catch(console.error);

            if (reply) return reply.bid;
            return -1;
        },
        getUserBid: async function(id) {
            const reply = await client.db('bid').collection('users').findOne({ uid: { $eq: id } }).catch(console.error);

            if (reply) return reply.bid;
            return -1;
        },
        increaseBidID: async function(id) {
            const nextBID = await this.getCurBid(id) + 1;
            if (nextBID == 0) return -1;
            const reply = await client.db('bid').collection('system').updateOne({ _id: { $eq: id } }, {
                $set: {
                    _id: id,
                    bid: nextBID
                }
            }, { upsert: true }).catch(console.error);

            if (reply) return nextBID;
            return -1;
        },
        getPastBidsOfUserByID: async function(id) {
            const reply = await client.db('bid').collection('users').findOne({ uid: { $eq: id } }).catch(console.error);

            if (reply) return reply.pastBids;
            return -1;
        },
        bidExists: async function(id) {
            const reply = await this.getCurBid('curBidID');
            if (reply == -1) return -1;

            if (id <= reply) return true;
            return false;
        },
        bidIsOpen: async function(id) {
            const exists = await this.bidExists(id);
            if (exists == -1) return -1;

            const reply = await client.db('bid').collection('bids').findOne({ bid: { $eq: id } });

            if (reply) return reply.active;
            return -1;
        },
        bidIsHigher: async function(id, val) {
            const exists = await this.bidExists(id);
            if (exists == -1) return -1;

            const curBidPrice = await this.getCurBidPrice(id);
            const minInc = await this.getMinInc(id);

            if (curBidPrice == -1 || minInc == -1) return -1;
            return val >= (curBidPrice + minInc);
        },
        getCurBidPrice: async function(id) {
            const exists = await this.bidExists(id);
            if (exists == -1) return -1;

            const reply = await client.db('bid').collection('bids').findOne({ bid: { $eq: id } });

            if (reply) return reply.curVal;
            return -1;
        },
        getMinInc: async function(id) {
            const exists = await this.bidExists(id);
            if (exists == -1) return -1;

            const reply = await client.db('bid').collection('bids').findOne({ bid: { $eq: id } });

            if (reply) return reply.min;
            return -1;
        },
        updateMsgID: async function(id, mid) {
            const reply = await client.db('bid').collection('bids').updateOne({ bid: { $eq: id } }, {
                $set: {
                    bid: id,
                    lastMsgID: mid
                }
            }, { upsert: true });

            if (reply) return 1;
            return -1;
        },
        isSelf: async function(id, bid) {
            const reply = await client.db('bid').collection('bids').findOne({ bid: { $eq: bid } });

            if (reply) return id == reply.uid;
            return -1;
        }
    }
};