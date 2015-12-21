EXCEPTION_PREFIX = Rails.application.secrets.exception_notifier['email_prefix']
EXCEPTION_RECIPIENTS = Rails.application.secrets.exception_notifier['exception_recipients']
EXCEPTION_SENDER = Rails.application.secrets.exception_notifier['sender_address']
NOTIFICATION_SENDER = Rails.application.secrets.exception_notifier['sender_address']

if Rails.env.to_s != 'development' && Rails.env.to_s != 'test'
	Dibb::Application.config.middleware.use ExceptionNotification::Rack,
												  :email => {
													  :email_prefix => EXCEPTION_PREFIX,
													  :sender_address => EXCEPTION_SENDER,
													  :exception_recipients => EXCEPTION_RECIPIENTS.split(' ')
												  }
end
