import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'
import { OptionsType } from '@/types/types'

const CHART_OPTIONS: Option[] = [
  { label: 'Speed vs Altitude', value: 'speed-altitude' },
  { label: 'Depth vs Temperature', value: 'depth-temperature' },
  { label: 'Battery Usage', value: 'battery-usage' },
]

const DETECTION_OPTIONS: Option[] = [
  { label: 'Propeller Anomaly', value: 'propeller_anomaly' },
  { label: 'Hull Damage', value: 'hull_damage' },
  { label: 'Corrosion', value: 'corrosion' },
  { label: 'Marine Growth', value: 'marine_growth' },
  { label: 'Leakage', value: 'leakage' },
  { label: 'Structural Integrity', value: 'structural_integrity' },
  { label: 'Anchor Issues', value: 'anchor_issues' },
  { label: 'Sonar Obstruction', value: 'sonar_obstruction' },
  { label: 'Sensor Malfunction', value: 'sensor_malfunction' },
  { label: 'Underwater Equipment', value: 'underwater_equipment' },
  { label: 'Debris', value: 'debris' },
  { label: 'Environmental Changes', value: 'environmental_changes' },
]

type OptionsProps = {
  onOptionsChange: (options: OptionsType) => void
  currentOptions: OptionsType // Add this prop
}

const Options: React.FC<OptionsProps> = ({
  onOptionsChange,
  currentOptions,
}) => {
  const [localOptions, setLocalOptions] = useState<OptionsType>(currentOptions)

  useEffect(() => {
    setLocalOptions(currentOptions)
  }, [currentOptions])

  const handleOptionChange = (key: keyof OptionsType, value: any) => {
    setLocalOptions((prevOptions) => {
      const newOptions = {
        ...prevOptions,
        [key]: value,
      }
      onOptionsChange(newOptions)
      return newOptions
    })
  }

  return (
    <div className='flex flex-col'>
      <form className='grid w-full items-start gap-6'>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Detection Options
          </legend>
          <div className='grid gap-3'>
            <Label htmlFor='detection-types'>Select Detection Types</Label>
            <MultipleSelector
              defaultOptions={DETECTION_OPTIONS}
              placeholder='Select detection types...'
              emptyIndicator={
                <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                  No results found.
                </p>
              }
              onChange={(values: Option[]) => {
                handleOptionChange(
                  'detectionType',
                  values.map((option) => option.value)
                )
              }}
            />
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='min-accuracy'>Minimum Detection Accuracy</Label>
            <Select
              value={localOptions.minAccuracy.toString()}
              onValueChange={(value) => {
                handleOptionChange('minAccuracy', Number(value))
              }}
            >
              <SelectTrigger id='min-accuracy'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='90'>90%</SelectItem>
                <SelectItem value='95'>95%</SelectItem>
                <SelectItem value='99'>99%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='align-center flex gap-3'>
            <Checkbox
              id='include-dimensions'
              checked={localOptions.includeImageDimension}
              onCheckedChange={(checked) => {
                handleOptionChange('includeImageDimension', checked as boolean)
              }}
            />
            <Label htmlFor='include-dimensions'>
              Include Detected Image Dimensions
            </Label>
          </div>
        </fieldset>

        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>Settings</legend>
          <div className='grid gap-3'>
            <Label htmlFor='num-images'>Number of Images</Label>
            <Select
              value={localOptions.numImages.toString()}
              onValueChange={(value) => {
                handleOptionChange('numImages', Number(value))
              }}
            >
              <SelectTrigger id='num-images'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1</SelectItem>
                <SelectItem value='2'>2</SelectItem>
                <SelectItem value='3'>3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='charts'>Charts</Label>
            <MultipleSelector
              defaultOptions={CHART_OPTIONS}
              placeholder='Select charts to include...'
              emptyIndicator={
                <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                  No results found.
                </p>
              }
              onChange={(values: Option[]) => {
                handleOptionChange(
                  'charts',
                  values.map((option) => option.value)
                )
              }}
            />
          </div>
        </fieldset>

        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>Messages</legend>
          <div className='grid gap-3'>
            <Label htmlFor='content'>Comment</Label>
            <Textarea
              id='content'
              placeholder='Special Observation...'
              className='min-h-[9.5rem]'
              value={localOptions.comment}
              onChange={(e) => {
                handleOptionChange('comment', e.target.value)
              }}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Options
