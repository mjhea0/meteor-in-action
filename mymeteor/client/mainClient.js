Answers = new Meteor.Collection("answers");
  
Template.addAnswer.events({
  'click input.add-answer' : function(e){
    e.preventDefault();
    var answerText = document.getElementById("answerText").value;
    Meteor.call("addAnswer",answerText,function(error , answerId){
      console.log('Added answer with ID: '+answerId);
    });
    document.getElementById("answerText").value = "";
  }
});

Template.answer.events({
  'click': function () {
    Session.set("selected_answer", this._id);
  },
  'click a.yes' : function(e) {
    e.preventDefault();
    var answerId = Session.get('selected_answer');
    console.log('updating yes count for answerId '+answerId);
    Meteor.call("incrementYesVotes",answerId);
  }, 
  'click a.no': function(e) {
    e.preventDefault();
    var answerId = Session.get('selected_answer');
    console.log('updating no count for answerId '+answerId);
    Meteor.call("incrementNoVotes",answerId);
  }
});

Template.answers.items = function(){
  return Answers.find({},{sort:{'submittedOn':-1}});
};
