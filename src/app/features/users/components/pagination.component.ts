import { Component, computed, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pagination',
  template: `
<div class="join flex justify-center py-3">
    @for (page of pagesList(); track page) {
        <button 
        class="join-item btn" 
        [class.btn-primary]="page === currentPage()"
        [routerLink]="[]"
        [queryParams]="{ page }"
        >{{page}}</button>
    }

</div>
  `,
  imports: [ RouterModule ]
})
export class PaginationComponent {
  currentPage = input(1);
  pages = input(0)

  pagesList = computed(()=> Array.from({length: this.pages() }, (_,i)=> i+1))
}
