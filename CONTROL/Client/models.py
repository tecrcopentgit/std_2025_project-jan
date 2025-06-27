from django.db import models
from django.contrib.auth.models import User

class Land(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    area_sqft = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='land_images/', blank=True, null=True)
    is_available = models.BooleanField(default=True)


class LandPurchase(models.Model):
    land = models.ForeignKey(Land, on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    status_choices = [
        ('processing', 'Processing'),
        ('paid', 'Paid'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='processing')
    created_at = models.DateTimeField(auto_now_add=True)


class ProjectProposal(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    user_address = models.TextField()
    land_location = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.name} - {self.land_location[:30]}"


class ProjectCommit(models.Model):
    proposal = models.OneToOneField(ProjectProposal, on_delete=models.CASCADE)
    estimated_amount = models.DecimalField(max_digits=12, decimal_places=2)
    advance_given = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    organization_charge = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @property
    def balance(self):
        return self.estimated_amount - (self.paid_amount + self.advance_given)

    def __str__(self):
        return f"Project for {self.proposal.name}"
    

class Material(models.Model):
    commit = models.ForeignKey(ProjectCommit, on_delete=models.CASCADE, related_name='materials')
    name = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    rate_per_unit = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def total_cost(self):
        return self.quantity * self.rate_per_unit
    

class Worker(models.Model):
    commit = models.ForeignKey(ProjectCommit, on_delete=models.CASCADE, related_name='workers')
    role = models.CharField(max_length=50)  # e.g., Mason, Laborer
    daily_salary = models.DecimalField(max_digits=10, decimal_places=2)
    days_worked = models.PositiveIntegerField()

    @property
    def total_salary(self):
        return self.daily_salary * self.days_worked
    


