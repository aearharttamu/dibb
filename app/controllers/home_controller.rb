class HomeController < ApplicationController

  before_action :authenticate_user!

  def index
    if current_user.enabled?
      render layout: "dibb"
    else
      render 'disabled'
    end
  end

	def test_exception
		raise "Test Exception Notifier: If you received this email, then the exception notifier is working."
	end

	def test_email
		TestMailers.email().deliver_now
	end
end
