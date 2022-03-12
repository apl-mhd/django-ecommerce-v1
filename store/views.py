import http
from itertools import product

from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Category, Product


def product_all(request):
    products = Product.products.all()

    #return HttpResponse('apel')
    return render(request, 'store/home.html', {'products': products})


def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug, in_stock=True)
    return render(request, 'store/products/single.html', {'product': product})



def category_list(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)
    return render(request, 'store/products/category.html', {'category':category, 'products':products})
    
#self.assertEqual(response.status_code, 200)
#zvqdhv9pck38a0mul27il90tddp9hq1k
