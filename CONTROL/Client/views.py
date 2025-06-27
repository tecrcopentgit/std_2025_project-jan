from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login , logout
from .models import Land,LandPurchase,ProjectProposal
from django.contrib.auth.decorators import login_required
from .forms import ProjectProposalForm

def homepage(request):
    
    return render(request, 'Client/home.html')
def objects(request):
    return render(request,'Client/object.html')



def register_view(request):
    if request.method == "POST":
        form =UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            return redirect('Client:login')
        else:
            return render(request, 'Client/register.html', {'form': form})
    else:

        form = UserCreationForm()
        return render(request, 'Client/register.html', {'form': form})
    
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request,form.get_user())
            
            return redirect('Client:homepage')
        else:
            return render(request,'Client/login.html')
        
    else:
        form = AuthenticationForm()
        return render(request, 'Client/login.html', {'form': form})
    

def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect('Client:login')


#landsection

def land_list(request):
    lands = Land.objects.filter(is_available=True)
    return render(request, 'Client/landlist.html', {'lands': lands})

def land_detail(request, land_id):
    land = get_object_or_404(Land, pk=land_id)
    return render(request, 'Client/land_details.html', {'land': land})

def processing(request, purchase_id):
    purchase = get_object_or_404(LandPurchase, pk=purchase_id, buyer=request.user)
    return render(request, 'Client/processing.html', {'purchase': purchase})

@login_required
def want_to_buy(request, land_id):
    land = get_object_or_404(Land, pk=land_id)
    purchase = LandPurchase.objects.create(land=land, buyer=request.user)
    return redirect('Client:processing', purchase_id=purchase.id)


@login_required
def owned_lands(request):
    purchases = LandPurchase.objects.filter(buyer=request.user, status='paid')
    return render(request, 'Client/owned.html', {'purchases': purchases})

@login_required
def all_processing(request):
    purchases = LandPurchase.objects.filter(buyer=request.user).filter(status__in=['processing', 'paid'])
    return render(request, 'Client/all_processing.html', {'purchases': purchases})

def approach_organizer(request):
    if request.method == 'POST':
        form = ProjectProposalForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'Client/user_commit_detail.html')
    else:
        form = ProjectProposalForm()
    return render(request, 'Client/approach.html', {'form': form})



@login_required
def my_commit_detail(request, proposal_id):
    proposal = get_object_or_404(ProjectProposal, id=proposal_id, name=request.user.username)
    commit = getattr(proposal, 'Client:projectcommit', None)
    materials = commit.materials.all() if commit else []
    workers = commit.workers.all() if commit else []

    return render(request, 'Client/user_commit_detail.html', {
        'proposal': proposal,
        'commit': commit,
        'materials': materials,
        'workers': workers,
    })

from .models import ProjectProposal, ProjectCommit

def approve_proposal(request, proposal_id):
    proposal = get_object_or_404(ProjectProposal, id=proposal_id)
    proposal.status = 'accepted'
    proposal.save()

    
    ProjectCommit.objects.get_or_create(proposal=proposal)

    return redirect('Client:commit_detail', proposal_id=proposal.id)

@login_required
def dashboard(request):
    accepted_proposal = ProjectProposal.objects.filter(
        name=request.user.username, status='accepted'
    ).first()  # or use user=request.user if FK

    return render(request, 'Client/dashboard.html', {'proposal': accepted_proposal})