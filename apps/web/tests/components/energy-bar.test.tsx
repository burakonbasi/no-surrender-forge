import { render, screen } from '@testing-library/react'
import { EnergyBar } from '@components/energy-bar'
import { useGameStore } from '@store/game-store'

jest.mock('@store/game-store')

describe('EnergyBar', () => {
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>

  beforeEach(() => {
    mockUseGameStore.mockReturnValue({
      energy: 50,
      maxEnergy: 100,
      fetchEnergy: jest.fn(),
    } as any)
  })

  it('renders energy bar with correct values', () => {
    render(<EnergyBar />)
    
    expect(screen.getByText('Enerji')).toBeInTheDocument()
    expect(screen.getByText('50/100')).toBeInTheDocument()
  })

  it('shows countdown when energy is not full', () => {
    render(<EnergyBar />)
    
    expect(screen.getByText(/Sonraki:/)).toBeInTheDocument()
  })
})