
class Basket():

    def __init__(self, request):

       self.session = request.session 
       basket = self.session.get('skey')
       if 'skey' not in request.session:
           basket = self.session['skey'] = {'number':9484738887}
           self.basket = basket





#zvqdhv9pck38a0mul27il90tddp9hq1k

        