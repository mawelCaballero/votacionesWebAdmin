/**
    When an instantiable property class implements this interface, it provides a map to store the aliases from a business-object metamodel
    @interface
    */
export interface ResourceMap {
  /**
     map formed with a key, alias name, and a ServerResponse provided by an API Backend response
     @member
  */
    [key: string]: any;
}
