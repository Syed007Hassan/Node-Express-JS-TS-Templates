/**
 * These templates provide structured guidelines for interacting with the language
 * model and generating responses in various scenarios.
 */
const templates = {
  /**
   * This template is used to generate a relevant answer from a user input,
   * a context and conversation history.
   */
  inquiryTemplate: (question: string, context: string, chatHistory: string) => `
    INSTRUCTIONS: 
    You should follow the following rules when generating an answer:
    - There will be a CONVERSATION LOG, CONTEXT, and a QUESTION.
    - Do not mention the CONVERSATION LOG in the answer, but you can use to generate the answer where relavent.
    - Ignore any conversation log that is not directly related to the user prompt.
    - Always prioritize the QUESTION over the CONVERSATION LOG.
    - The answer should be based on the CONTEXT. Only use external sources if relevant to Brianbuilder.
    - Use lists, paragraphs and text styling to present the result in markdown where necessary.
    - If the QUESTION is not related to Brainsbuilder respond by telling the user that you only answer questions related to Brainsbuilder.
    - If you don't know the answer to the QUESTION or you are unable to formulate an answer, respond but telling the user you don't know the answer to the question.
    
    Given the following QUESTION and CONVERSATION LOG, formulate an answer that would be the most relevant to the user QUESTION.

    Use this CONTEXT to help formaulate an answer. This is an answer to a similar question in our database: ${context}

    QUESTION: ${question}
  `,

  /**
   * This template is used to convert an assessment to the Brainsbuilder format.
   * The assessment can then be imported into the Brainsbuilder platform.
   */
  convertAssessmentTemplate: (description: string, chatHistory: string) => `
  `,

  /**
   * This template is used to generate an assessment.
   */
  generateAssessmentTemplate: (description: string, chatHistory: string) => `
    INSTRUCTIONS: 
    You should follow the rules below when generating a response:
    There will be a USER QUERY.
    The USER QUERY should be used to generate the assessment.
    
    TASK: 
    You should generate assessment questions about the topic that user is asking.
    You should try to infer the assessment type if it's not explicit. This can be one of four types of assessment EXAM, SURVEY, QUESTIONAIRRE or PERSONALIRY TEST.
    If the user has specififed a title please use the title spefified.
    If the user has not specified a title please generate a suitable title. 
    After you have generated the assessment please ask the user if further help is required.

    DEFINITIONS:
    For the purposes of this assessment generator:
    - "Exam" type assessments have one or more correct options. This type of assessment many or may not have a pass grade. Other types of assessment (i.e. "Survey", "Questionnaire" and "Personaliy Test") do not have any "Correct Answers". 
    - "Questionnaires" are scored but to do have a pass grade.
    - "Survey" type assessments are not scored i.e. all questions have no points.
    - "Personality Tests" are advanced "Questionnaires" where the points are allocated to named categories.
    
    ASSUMPTIONS: 
    Follow these assumptions unless user has explicitly mentioned anything to the contrary.
    - If you cannot infer the assessment type generate an "Exam" type assessment.
    - If the user does not specify the amount of questions generate 10 questions otherwise generate the amount of questions the user asks.
    - All questions should grouped into sections and the sections will all be named.
    - If the assessment has 10 questions or less then a single section can be used to group the questions if no sections are specified.
    
    ASSESSMENT FORMAT RULES (ALL ASSESSMENT TYPES):  
    - When the assessment is displayed it should be displayed a strict format using Markdown.
    - There should be formatted tltle, introduction, sections, questions (with options) and finishing comments.   
    - Display the assessment title.
    - Below is an example of the "Assessment Title" format where the text after the colan is the assessment title.
      ## Assessment Title: Solidity Assessment for Beginners
    - Display a short introduction paragraph about the assesment. This is for the person taking the assessment. This must include the type of assessment (i.e. "Exam", "Survey", "Questionnaire" or "Personaliy Test") and the amount of questions and the amount of sections.
    - Below is an example of the "Section" header, where the number is the section number.
      ### Section 1: Solidity Basics
  
    ADDITIONAL FORMAT RULES FOR EXAMS:
    The following rules are additional rules for "Exam" type assessments only.
    - Below is an example of the question format:-
    Question 1. What is Solidity?
      1. A programming language for developing smart contracts on the Ethereum blockchain
      2. A programming language for developing mobile applications
      3. A programming language for developing web applications
      4. A programming language for developing artificial intelligence systems
      ###### Correct Answer: Option 1
    It is very important that the correct answer is shown after the question options for ALL "Exam" type questions.
    - If there are multiple correct answers for an "Exam" type question the format should be:- 
      ###### Correct Answer: Option 1, Option 2
    It is very important that a passing and failing finishing comment is displayed. 
    - This must be displayed at the end of the assessment after the sections and questions.
    - Below is an example of the comments format:-
      #### Passing Comments: You have passed this exam. Well done!
      #### Failing Comments: You have unfortunetly failed this exam.

    ADDITIONAL FORMAT RULES FOR QUESTIONNAIRES:
    The following rules are for "Questionnaire" type assessments only.
    Personality test type assessments have categories. 
    Points are allocated to categories depending on how the questions is answered.
    
    ADDITIONAL INSTRUCTIONS:
    If you can't generate the assessment deny the request and respond them that you can't generate the assessment questions.
    Based on the USER QUERY generate thoughtful and descriptive questions along with their required options.
    The amount of options for questions can vary.
    Please remember that this is an assessent building tool i.e it's for assessment builders NOT assessment takers so please conclude with an appropriate helpful message. 

    USER QUERY: ${description}
  `,
};

export { templates };
