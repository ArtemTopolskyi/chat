export enum LoginError {
  IncorrectPasswordLength = 'Incorrect password length',
  IncorrectUsernameLength = 'Incorrect username length',
  EmailAlreadyTaken = 'Email already taken',
  WrongData = 'User does not exist or entered password is wrong'
}

export enum UserError {
  NotAuthUser = 'User is not authentificated',
  UserNotExist = 'User doesn\'t exist',
  NotChatParticipant = 'User is not chat participant',
  NotMessageAuthor = 'User is not message author'
}

export enum MessageError {
  NotFound = 'Message not found',
  WasNotUpdated = 'Message was not updated',
  WasNotDeleted = 'Message was not deleted'
}
