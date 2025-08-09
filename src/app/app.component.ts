import { Component } from '@angular/core';
import { NavigationComponent } from './component/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'food-delivery-app';
}