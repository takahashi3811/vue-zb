// 部署・所属情報の型定義
export interface DivisionData {
  id: number
  departmentCode: string
  departmentName: string
  divisionCode: string
  divisionName: string
  startDate: string
  endDate: string | null
  isMain: boolean
}

// 空のDivisionDataを作成する関数
export const createEmptyDivision = (id: number = 0): DivisionData => ({
  id,
  departmentCode: '',
  departmentName: '',
  divisionCode: '',
  divisionName: '',
  startDate: '',
  endDate: null,
  isMain: false,
})

// 新しいIDを生成する関数（既存のデータ配列から最大IDを取得して+1）
export const generateNewDivisionId = (existingData: DivisionData[]): number => {
  if (existingData.length === 0) return 1
  return Math.max(...existingData.map((item) => item.id), 0) + 1
}

// サンプルデータ
export const sampleDivisionData: DivisionData[] = [
  {
    id: 1,
    departmentCode: 'D001',
    departmentName: '営業部',
    divisionCode: 'DV001',
    divisionName: '第一営業課',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isMain: true,
  },
  {
    id: 2,
    departmentCode: 'D002',
    departmentName: '開発部',
    divisionCode: 'DV002',
    divisionName: 'システム開発課',
    startDate: '2024-06-01',
    endDate: null,
    isMain: false,
  },
  {
    id: 3,
    departmentCode: 'D003',
    departmentName: '人事部',
    divisionCode: 'DV003',
    divisionName: '人事課',
    startDate: '2024-03-15',
    endDate: '2025-03-14',
    isMain: false,
  },
]

