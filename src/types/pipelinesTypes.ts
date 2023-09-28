export interface IPipelineBody {
  name?: string,
  external_diameter: number,
  internal_diameter: number,
  length: number
}

export interface IPipeline {
  id: number;
  name: string;
  external_diameter: number;
  internal_diameter: number;
  length: number;
}
