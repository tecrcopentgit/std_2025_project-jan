from django import forms
from .models import ProjectProposal

class ProjectProposalForm(forms.ModelForm):
    class Meta:
        model = ProjectProposal
        fields = ['name', 'phone', 'user_address', 'land_location']