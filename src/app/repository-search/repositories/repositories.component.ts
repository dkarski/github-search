import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RepositoriesService } from './repositories.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Repository } from './repository.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit {
  form: FormGroup;
  repositories$: Observable<Repository[]> = this.repositoriesService.repositories$.pipe(
    tap(repositories => console.log(repositories)),
  );
  constructor(private formBuilder: FormBuilder, private repositoriesService: RepositoriesService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.repositoriesService.fetchRepositories(this.form.value.search);
  }
}
