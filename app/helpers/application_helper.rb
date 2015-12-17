module ApplicationHelper
	def devise_error
		return "" if resource.errors.empty?

		messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join

		html = <<-HTML
    <div id="error_explanation">
      <h4>Error:</h4>
      <ul>#{messages}</ul>
    </div>
		HTML

		html.html_safe
	end
end
