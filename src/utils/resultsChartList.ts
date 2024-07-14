import { SolarDataKeys } from "../services/projectsServices";

export interface ISolarDataResponse {
  hora_std: number[];
  hora_m: number[];
  inclinacion_solar: number[];
  azimuth_solar: number[];
  radiacion_extraterrestre: number[];
  irradiacion_extraterrestre: number[];
  potencia_tubo: number;
  potencia_haz: number[];
  potencia_difusa: number[];
  potencia_total: number[];
  energia_tubo: number;
  energia_n_tubo: number;
  energia_acumulado_dia: number;
  eficiencia_dia: number;
  energia_acumulado_dia_mendoza: number;
  eficiencia_dia_mendoza: number[];
  eficiencia_1: number[];
  energia_acumulada: number[];
}

export const resultsChartsList = [
  {
    title: 'Inclinación Solar',
    key: 'inclinacion_solar',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.InclinacionSolar]
  },
  {
    title: 'Azimuth Solar',
    key: 'azimuth_solar',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.AzimuthSolar]
  },
  {
    title: 'Intensidad de la Radiación Extraterrestre sobre Superficie Horizontal [W/m2]',
    key: 'intensidad_radiación',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.RadiacionExtraterrestre]
  },
  {
    title: 'Irradiación Extraterrestre sobre Superficie Horizontal por Intervalo de Tiempo [J/m2 \\Deltat]',
    key: 'irradiación_intervalo',
    x: SolarDataKeys.HoraM,
    y: [SolarDataKeys.IrradiacionExtraterrestre]
  },
  {
    title: "Potencia de Haz, Difusa y Total que absorbe 1 Tubo al vacío durante el dia [W]",
    key: 'potencias',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.PotenciaHaz, SolarDataKeys.PotenciaDifusa, SolarDataKeys.PotenciaTotal]
  },
  {
    key: 'evolución_numero',
    title: 'Evolucion del Numero de Nu.Gr/Pr',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.EvolucionNuGrPr]
  },
  {
    key: 'evolución_reynolds',
    title: 'Evolucion del Numero de Reynolds',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.EvolucionReynolds]
  },
  {
    key: 'flujo_masico',
    title: 'Flujo Masico de Agua Caiente que Sale del Tubo al Vacio',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.FlujoMasico]
  },
  {
    title: 'Velocidad Media Agua Caiente que Sale del Tubo al Vacio',
    key: 'velocidad_media',
    x: SolarDataKeys.HoraStd,
    y: [SolarDataKeys.VelocidadSalida]
  },
  {
    title:
      'Temperaturas de Mezcla, de Salida y del Tanque de la Terma Solar [C] - Correlacion de Mendoza (2023)',
    key: 'temperaturas_mezcla',
    x: SolarDataKeys.HoraStd,
    y: [
      SolarDataKeys.TemperaturaMezcla,
      SolarDataKeys.TemperaturaSalida,
      SolarDataKeys.TemperaturaTanque,
      SolarDataKeys.TemperaturaAmbiente
    ]
  },
  {
    title: 'Eficiencia Termica de la Terma Solar (según la 1ra ley)',
    key: 'eficiencia_termica',
    x: SolarDataKeys.HoraStd,
    y: [
      SolarDataKeys.Eficiencia1
    ]
  },
  {
    title: 'Energia Térmica acumulada en el termotanque [MJ]',
    key: 'energia_termica',
    x: SolarDataKeys.HoraStd,
    y: [
      SolarDataKeys.EnergiaAcumulada
    ]
  },
];


export const transformDataForChart = (xData: number[], yDataArrays: number[][]): any[] => {
  return xData.map((x, index) => {
    const dataPoint: any = { x };
    yDataArrays.forEach((yData, yIndex) => {
      dataPoint[`y${yIndex}`] = yData[index];
    });
    return dataPoint;
  });
}
