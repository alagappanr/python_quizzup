from django.core.mail import EmailMultiAlternatives, send_mail, get_connection
from django.utils.html import strip_tags
from django.template.loader import render_to_string

def send_mail_via_gmail(template, context, subject, to):
    html_content = render_to_string(template, context)
    text_content = strip_tags(html_content) # this strips the html, so people will have the text as well.
    msg = EmailMultiAlternatives(subject, text_content, 'vivekhas3@gmail.com', to)
    msg.attach_alternative(html_content, "text/html")
    connection = get_connection()
    connection.username='vivekhas3@gmail.com'
    connection.password='g00gle_vivek'
    connection.send_messages([msg,])

