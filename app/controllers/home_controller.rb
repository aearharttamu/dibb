class HomeController < ApplicationController

  before_action :authenticate_user!

  def index
    render layout: "dibb"
  end

	def test_exception
		raise "Test Exception Notifier: If you received this email, then the exception notifier is working."
	end

	def test_email
		TestMailers.email().deliver_now
	end
end
