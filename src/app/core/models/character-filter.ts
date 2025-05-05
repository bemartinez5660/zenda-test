export interface CharacterParams {
  page?: number;
  filters?: CharacterFilter[]
}

export interface CharacterFilter {
  filterName: string,
  filterValue?: string
}
