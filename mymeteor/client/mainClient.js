Answers = new Meteor.Collection("answers");
  
Template.addAnswer.events({
  'click input.add-question' : function(e){
    e.preventDefault();
    var answerText = document.getElementById("answerText").value;
    Meteor.call("addAnswer",answerText,function(error , answerId){
      console.log('Added answer with ID: '+answerId);
    });
    document.getElementById("answerText").value = "";
  }
});
