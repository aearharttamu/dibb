class TestMailers < ActionMailer::Base

	def email()
		mail(to: EXCEPTION_RECIPIENTS, from: NOTIFICATION_SENDER, subject: "#{SITE_PREFIX} #{SITE_NAME} Test Email")
	end
end
