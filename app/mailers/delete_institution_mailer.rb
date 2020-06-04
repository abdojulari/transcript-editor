class DeleteInstitutionMailer < ApplicationMailer
  def perform(institution_name, user_email)
    @institution_name = institution_name
    subject_line = "#{@institution_name} was succesfully deleted"
    mail(to: user_email, subject: subject_line)
  end
end
