import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {PostsService} from '../shared/post.service';
import {Post} from '../shared/interface';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {MatSort} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import defaultLanguage from '../../assets/i18n/en.json';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  private displayedColumns: string[] = ['id', 'title', 'author', 'date',  'category'];
  private dataSource: MatTableDataSource<Post>; // контейнер - источник данных для таблицы
  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  posts: Post[] = [];

  constructor(private postsService: PostsService, private translate: TranslateService) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
    }

  ngOnInit() {
   this.postsService.getAll().subscribe(posts => {this.posts = posts; console.log(this.posts);
                                                  this.dataSource = new MatTableDataSource(this.posts);
                                                  console.log(this.dataSource);
                                                  this.refreshTable();
   } ) ;
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)


  }

// в этом методе уже все проинциализировано, поэтому можно присваивать объекты (иначе может быть ошибка undefined)
 // ngAfterViewInit(): void { this.addTableObjects(); }
  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private refreshTable() {

    this.dataSource.data = this.posts;  // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();


    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (post, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'category': {
          return post.author;
        }
        case 'date': {
          return post.date;
        }

        case 'title': {
          return post.title;
        }
      }
    };

  }

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
