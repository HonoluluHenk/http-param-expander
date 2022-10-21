import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {MatrixParamExpander} from 'http-param-expander';
import {ApiModule, ComplexParams, Configuration, MatrixParamsService, Param} from 'src/openapi-generated';
import {MyCustomType} from './my-custom.type';
import {MyFormatter} from './my.formatter';

describe('CustomPathParamsService', () => {
  const myExpander = new MatrixParamExpander<Param>(new MyFormatter());

  const apiConfig: Configuration = new Configuration({
    encodeParam: param => myExpander.expand({
      name: param.name,
      value: param.value,
      explode: param.explode,
      opts: param,
    }),
  });

  let api: MatrixParamsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        HttpClientTestingModule,
        ApiModule,
      ],
      providers: [
        {
          provide: Configuration,
          useValue: apiConfig,
        },
      ],
    });
    api = TestBed.inject(MatrixParamsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  })

  it('should be created', () => {
    expect(api).toBeTruthy();
    expect(http).toBeTruthy();
  });

  it('serializes a plain string parameter', () => {
    api.plainMatrixParamFlat('World')
      .subscribe({
        next: response => {
          expect(response).toEqual('Hello World');
        },
        error: err => fail(err),
      });

    http.expectOne('http://localhost/plainMatrixParamFlat;plainParamFlat=World')
      .flush('Hello World');
  })

  it('serializes a parameter with a custom type/formatter', () => {
    const value = new MyCustomType('World');
    // this would need a diffrent openapi.yml which I'm currently too
    // lazy to implement.

    const valueAsAny = value as any;

    api.plainMatrixParamFlat(valueAsAny)
      .subscribe({
        next: response => {
          expect(response).toEqual('Hello World');
        },
        error: err => fail(err),
      });

    http.expectOne('http://localhost/plainMatrixParamFlat;plainParamFlat=World')
      .flush('Hello World');
  })

  it('serializes a complex parameter', () => {
    const param: ComplexParams = {
      key: 'foo',
      value: 123,
    }

    api.complexMatrixParamExploded(param)
      .subscribe({
        next: response => {
          expect(response).toEqual('Hello World');
        },
        error: err => fail(err),
      });

    http.expectOne('http://localhost/complexMatrixParamExploded;key=foo;value=123')
      .flush('Hello World');
  });

});
