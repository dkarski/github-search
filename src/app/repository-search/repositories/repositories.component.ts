import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoriesService } from './repositories.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Repository } from './repository.model';
import { CustomValidators } from './custom.validators';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  form: FormGroup;
  loading = false;
  repositories$: Observable<Repository[]> = this.repositoriesService.repositories$.pipe(
    tap(() => (this.loading = false)),
  );
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private repositoriesService: RepositoriesService,
  ) {}

  ngOnInit(): void {
    const search = this.route.snapshot.queryParamMap.get('search');
    this.form = this.formBuilder.group({
      search: [search, [Validators.required, CustomValidators.isNullOrEmpty]],
    });
    if (search) {
      this.fetchRepositories();
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.fetchRepositories();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.form.value.search },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  getLanguageColor(languageType: string): string {
    const languageColor = LANGUAGE_COLOR_MAP.get(languageType as LanguageType);
    return languageColor ? languageColor : '#555555';
  }

  private fetchRepositories(): void {
    this.loading = true;
    this.repositoriesService.fetchRepositories(this.form.value.search);
  }
}

enum LanguageType {
  JavaScript = 'JavaScript',
  Java = 'Java',
  Go = 'Go',
  Python = 'Python',
  HTML = 'HTML',
  Swift = 'Swift',
  Ruby = 'Ruby',
}

const LANGUAGE_COLOR_MAP: Map<LanguageType, string> = new Map([
  [LanguageType.JavaScript, '#f1e05a'],
  [LanguageType.Java, '#b07219'],
  [LanguageType.Go, '#00ADD8'],
  [LanguageType.Python, '#3572A5'],
  [LanguageType.HTML, '#e34c26'],
  [LanguageType.Swift, '#ffac45'],
  [LanguageType.Ruby, '#701516'],
]);
