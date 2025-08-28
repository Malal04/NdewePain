import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../_utils/header/header.component";
import { FooterComponent } from "../../../_utils/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

  constructor (
    private router : Router
  ) {}

  messages: { type: 'agent' | 'client', text: string }[] = [
    { type: 'agent', text: "Bonjour 👋 ! Comment puis-je vous aider aujourd’hui ?" },
    { type: 'client', text: "J’ai une question concernant ma commande." }
  ];

  newMessage: string = "";

  sendMessage() {
    if (this.newMessage.trim() !== "") {
      this.messages.push({ type: 'client', text: this.newMessage });
      this.newMessage = "";

      // Réponse automatique de test
      setTimeout(() => {
        this.messages.push({
          type: 'agent',
          text: "Merci pour votre message 😊. Un agent va prendre en charge votre demande."
        });
        this.router.navigate(['/support']);
      }, 1000);
    }
  }

  startNewChat() {
    this.messages = [
      { type: 'agent', text: "Bonjour 👋 ! Bienvenue dans le support en ligne. Comment puis-je vous aider ?" }
    ];
  }

}
