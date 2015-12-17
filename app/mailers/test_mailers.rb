class TestMailers < ActionMailer::Base

	def email()
		mail(to: EXCEPTION_RECIPIENTS, from: NOTIFICATION_SENDER, subject: "#{Rails.application.secrets.skin['site_prefix']} #{Rails.application.secrets.skin['site_name']} Test Email")
	end
end
