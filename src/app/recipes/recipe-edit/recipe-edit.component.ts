import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm:FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          // tslint:disable-next-line: no-string-literal
          this.id = +params['id'];
          // tslint:disable-next-line: no-string-literal
          this.editMode = params['id'] != null;
          console.log(this.editMode);
          this.intiForm();
        }
      );
  }

  private intiForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngridients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingridients']){
        for (let ingridient of recipe.ingridients){
          recipeIngridients.push(new FormGroup({
            'name': new FormControl(ingridient.name),
            'amount': new FormControl(ingridient.amount)
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingridients': recipeIngridients
    });

  }
  onSubmit(){
    console.log(this.recipeForm);

  }

  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )

    }

}
