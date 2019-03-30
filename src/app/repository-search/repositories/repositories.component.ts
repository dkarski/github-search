import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  repositories$: Observable<Repository[]> = this.repositoriesService.repositories$.pipe(
    tap(repositories => console.log(repositories)),
  );
  constructor(private formBuilder: FormBuilder, private repositoriesService: RepositoriesService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: [null, [Validators.required, CustomValidators.isNullOrEmpty]],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.repositoriesService.fetchRepositories(this.form.value.search);
  }

  getLanguageColor(languageType: string): string {
    const languageColor = LANGUAGE_COLOR_MAP.get(languageType as LanguageType);
    return languageColor ? languageColor : '#555555';
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
