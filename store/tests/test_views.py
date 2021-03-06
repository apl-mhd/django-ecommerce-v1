from audioop import reverse
from cgitb import html
from email.mime import image
from re import S
from unicodedata import category, name
from unittest import skip
from urllib import request, response

from django.contrib.auth.models import User
from django.http import HttpRequest
from django.test import Client, RequestFactory, TestCase
from django.urls import reverse

from store.models import Category, Product
from store.views import product_all

# @skip('demonstarting skipping')
# class TestSkip(TestCase):
#     def test_skip_example(self):
#         pass



class TestViewResponse(TestCase):
    def setUp(self):
        self.c = Client()
        self.factory = RequestFactory()
        User.objects.create(username='admin')
        Category.objects.create(name='django', slug='django')
        Product.objects.create(category_id=1, title='django beginers', created_by_id=1, slug='django-beginers', price=20.00, image='django1')

    def test_url_allowed_hosts(self):
        response = self.c.get('/', HTTP_HOST='noaddress.com')
        self.assertEqual(response.status_code, 200)
        response = self.c.get('/', HTTP_HOST='yourdomain.com')
        self.assertEqual(response.status_code, 200)

    def test_product_detail_url(self):
        response = self.c.get(reverse('store:product_detail', args=['django-beginers']))
        self.assertEqual(response.status_code, 200)

    
    def test_category_detail_url(self):

        response = self.c.get(reverse('store:category_list', args=['django-beginners']))
        self.assertEqual(response.status_code, 200)
    
    def test_homepage_html(self):
        request = HttpRequest()
        response = all_products(request)
        html = response.content.decode('utf8')
        print(html)
        self.assertIn('<title>home</title>', html)
        self.assertTrue(html.startswith('\n <!DOCTYPE> \n'))
        self.assertEqual(response.status_code, 200)

    
    def test_view_function(self):
        request = self.factory.get('/django-beginers')
        response = all_products(request)
        html = response.content.decode('utf8')
        self.assertIn('<title>BookStore</title>', html)
        self.assertTrue(html.startswith('\n <!DOCTYPE> \n'))
        self.assertEqual(response.status_code, 200)


    
