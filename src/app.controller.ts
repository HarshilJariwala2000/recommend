import { Body, Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

export interface RecommendationServiceClient {
  recommend: (any:any)=>Observable<any>;

}

@Controller()
export class AppController implements OnModuleInit{
  private recommendationService:RecommendationServiceClient;
  constructor(@Inject('RECOMENDATION_PACKAGE') private client: ClientGrpc) {}
  
  onModuleInit() {
    this.recommendationService = this.client.getService<RecommendationServiceClient>('Recommendations',);
  }

  @Get('a')
  recommend(@Body() body){
    return this.recommendationService.recommend({
      user_id:1,
      max_results:2,
      category:"MYSTERY"
    })
  }
}
