import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filterText: string = '';
  
  restaurants: Restaurant[] = [
    { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5, image: 'pizza-palace.jpg' },
    { id: 2, name: 'Burger King', cuisine: 'American', rating: 4.2, image: 'burger-king.jpg' },
    { id: 3, name: 'Sushi Express', cuisine: 'Japanese', rating: 4.7, image: 'sushi-express.jpg' },
    { id: 4, name: 'Taco Bell', cuisine: 'Mexican', rating: 4.0, image: 'taco-bell.jpg' },
    { id: 5, name: 'Indian Spice', cuisine: 'Indian', rating: 4.6, image: 'indian-spice.jpg' },
    { id: 6, name: 'Chinese Garden', cuisine: 'Chinese', rating: 4.3, image: 'chinese-garden.jpg' },
    { id: 7, name: 'Vegan Delight', cuisine: 'Vegan', rating: 4.8, image: 'vegan-delight.jpg' },
    { id: 8, name: 'Steak House', cuisine: 'Steakhouse', rating: 4.4, image: 'steak-house.jpg' },
    { id: 9, name: 'Dessert Haven', cuisine: 'Desserts', rating: 4.9, image: 'desert-heaven.jpg' },
    { id: 10, name: 'Coffee Corner', cuisine: 'Café', rating: 4.1, image: 'coffee-corner.jpg' }
  ];

  get filteredRestaurants(): Restaurant[] {
    if (!this.filterText) {
      return this.restaurants;
    }
    return this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
