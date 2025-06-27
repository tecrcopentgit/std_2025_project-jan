from django.contrib import admin
from . models import Land,LandPurchase,ProjectProposal,ProjectCommit,Material,Worker


admin.site.register(Land)

@admin.register(LandPurchase)
class LandPurchaseAdmin(admin.ModelAdmin):
    list_display = ('land', 'buyer', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('land__title', 'buyer__username')



@admin.register(ProjectProposal)
class ProjectProposalAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'land_location', 'status', 'submitted_at')
    list_filter = ('status',)
    search_fields = ('name', 'land_location')

admin.site.register(ProjectCommit)
admin.site.register(Material)
admin.site.register(Worker)