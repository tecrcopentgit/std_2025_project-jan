from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name= "Client"



urlpatterns=[
    path('',views.homepage,name='homepage'),
    path('objects/',views.objects,name='objects'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/',views.logout_view,name='logout'),
    path('land/', views.land_list, name='land'),
    path('<int:land_id>/', views.land_detail, name='land_detail'),
    path('processing/<int:purchase_id>/', views.processing, name='processing'),
    path('buy/<int:land_id>/', views.want_to_buy, name='want_to_buy'),
    path('all-processing/', views.all_processing, name='all_processing'),
    path('approach-organizer/', views.approach_organizer, name='approach_organizer'),
    path('proposal/<int:proposal_id>/commit/', views.approve_proposal, name='commit_detail')

]



urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
