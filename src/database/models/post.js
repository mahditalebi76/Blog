const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema definition
const postSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        ref: 'User'
    },
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});

// // create a query for comments with a blogpost _id matching `id`
// schema.statics.findComments = function (id, callback) {
//     return this.model('Comment').find({
//         post: id
//     }, callback);
// }


// schema.statics.edit = function (req, callback) {
//     var id = req.param('id');
//     var author = req.session.user;

//     // validate current user authored this blogpost
//     var query = {
//         _id: id,
//         author: author
//     };

//     var update = {};
//     update.title = req.param('title');
//     update.body = req.param('body');

//     this.update(query, update, function (err, numAffected) {
//         if (err) return callback(err);

//         if (0 === numAffected) {
//             return callback(new Error('no post to modify'));
//         }

//         callback();
//     })
// }






// clean up comments
// Post.on('afterRemove', function (post) {
//     this.model('Comment').remove({
//         post: post._id
//     }).exec(function (err) {
//         if (err) {
//             console.error('had trouble cleaning up old comments', err.stack);
//         }
//     })
// })

module.exports = mongoose.model('Post', postSchema);