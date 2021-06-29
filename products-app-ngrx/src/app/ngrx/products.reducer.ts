import {Product} from "../model/product.model";
import {ProductsActions, ProductsActionsTypes} from "./products.action";
import {Action} from "@ngrx/store";

export enum ProductsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface ProductsState{
  products:Product[],
  errorMessage:string,
  dataState:ProductsStateEnum,
  currentProduct:Product|null,
  currentAction:ProductsActions|null


}

const initState:ProductsState={
  products:[],
  errorMessage:"",
  dataState:ProductsStateEnum.INITIAL,
  currentProduct:null,
  currentAction:null,
}

export function productsReducer(state=initState, action:Action):ProductsState{
  switch (action.type) {
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Get Selected Products*/
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Search Products*/
    case ProductsActionsTypes.SEARCH_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Select Products*/
    case ProductsActionsTypes.SELECT_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.SELECT_PRODUCT_SUCCESS:
      let product:Product=(<ProductsActions>action).payload
      let listProducts=[...state.products];
      let data:Product[]=listProducts.map(p=>(p.id==product.id)?product:p);
      return {...state, dataState:ProductsStateEnum.LOADED, products:data, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.SELECT_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Delete Products*/
    case ProductsActionsTypes.DELETE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
      let p:Product=(<ProductsActions>action).payload
      let index=state.products.indexOf(p);
      let productslist=[...state.products];
      productslist.slice(index,1);
      return {...state, dataState:ProductsStateEnum.LOADED, products:productslist, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.DELETE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*New Product*/
    case ProductsActionsTypes.NEW_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState:ProductsStateEnum.NEW, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.NEW_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Save Product*/
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      let prods=[...state.products];
      prods.push((<ProductsActions>action).payload);
      return {...state, dataState:ProductsStateEnum.LOADED, products:prods, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Edit Product*/
    case ProductsActionsTypes.EDIT_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.EDIT_PRODUCT_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, currentProduct:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.EDIT_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    /*Update Product*/
    case ProductsActionsTypes.UPDATE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action}
    case ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS:
      let updatedProduct:Product=(<ProductsActions>action).payload;
      let UpdatedProducts:Product[]=state.products.map(p=>(p.id==updatedProduct.id)?updatedProduct:p)
      return {...state, dataState:ProductsStateEnum.UPDATED, products:UpdatedProducts}
    case ProductsActionsTypes.UPDATE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action}

    default:return {...state}
  }

}
