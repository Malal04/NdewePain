import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tache } from '../../_interface/panier';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css'
})
export class ProductionComponent {
  vueActive: 'jour' | 'semaine' | 'mois' = 'semaine';
  jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  semaines = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20]
  ];

  dateSelectionnee: Date = new Date(2024, 6, 15);

  taches: Tache[] = [
    { titre: 'Préparer la pâte', produit: 'Pain au levain', quantite: '50 pains', deadline: new Date(2024,6,15), responsable: 'Emily Carter', statut: 'en cours' },
    { titre: 'Cuisiner les pâtisseries', produit: 'Croissants', quantite: '100 pièces', deadline: new Date(2024,6,16), responsable: 'David Lee', statut: 'programmé' },
    { titre: 'Préparer les ingrédients', produit: 'Cookies chocolat', quantite: '200 cookies', deadline: new Date(2024,6,17), responsable: 'Sarah Jones', statut: 'programmé' }
  ];

  get tachesSelectionnees() {
    return this.taches.filter(t => 
      t.deadline.toDateString() === this.dateSelectionnee.toDateString()
    );
  }

  changerVue(vue: 'jour' | 'semaine' | 'mois') {
    this.vueActive = vue;
  }

  ajouterTache() {
    alert('Formulaire d’ajout de tâche en cours de développement 🚀');
  }

  modifierTache(tache: Tache) {
    alert(`Modifier la tâche : ${tache.titre}`);
  }

}
