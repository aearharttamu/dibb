class StagingMailInterceptor
	def self.delivering_email(message)
		message.subject = "INTERCEPTED: [#{message.to}] #{message.subject}"
		message.to = Rails.application.secrets.mail_intercept['email_list']
	end
end
