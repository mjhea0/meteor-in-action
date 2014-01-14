Answers = new Meteor.Collection("answers");

Meteor.methods({
  addAnswer : function(answerText){
    console.log('Adding Answer ...');
    var answerId = Answers.insert({
      'answerText' : answerText,
      'submittedOn': new Date()
    });
    console.log(answerId)
    return answerId;
  }
});
