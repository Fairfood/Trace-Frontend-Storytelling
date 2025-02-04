// API models
/* istanbul ignore file */
export interface Stage {
  actor_name: string;
  actors: any[];
  image: string;
  stage_products: string[];
  title: string;
}

export interface ApiResponse {
  code: number;
  data: any;
  detail: string;
  success: boolean;
}

export interface NodeInfo {
  node: string;
  node_name: string;
  external_sources: string[];
}