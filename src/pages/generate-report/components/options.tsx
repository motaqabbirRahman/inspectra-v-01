import { useState } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type OptionsType = {
  model: string
  numImages: number
  includeRoverData: string
  charts: string
  comment: string
}

type OptionsProps = {
  onOptionsChange: (options: OptionsType) => void
}

const Options = ({ onOptionsChange }: OptionsProps) => {
  const [model, setModel] = useState('genesis')
  const [numImages, setNumImages] = useState(2)
  const [includeRoverData, setIncludeRoverData] = useState('yes')
  const [charts, setCharts] = useState('speed-altitude')
  const [comment, setComment] = useState('')

  const handleOptionChange = () => {
    onOptionsChange({
      model,
      numImages,
      includeRoverData,
      charts,
      comment,
    })
  }

  return (
    <div className='flex flex-col'>
      <form
        className='grid w-full items-start gap-6'
        onChange={handleOptionChange}
      >
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>Settings</legend>
          <div className='grid gap-3'>
            <Label htmlFor='num-images'>Number of Images</Label>
            <Select
              value={numImages.toString()}
              onValueChange={(value) => {
                setNumImages(Number(value))
                handleOptionChange()
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

          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='include-rover-data'>Include Rover Data</Label>
              <Select
                value={includeRoverData}
                onValueChange={(value) => {
                  setIncludeRoverData(value)
                  handleOptionChange()
                }}
              >
                <SelectTrigger
                  id='include-rover-data'
                  className='items-start [&_[data-description]]:hidden'
                >
                  <SelectValue placeholder='Select an option' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='yes'>Yes</SelectItem>
                  <SelectItem value='no'>No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='charts'>Charts</Label>
              <Select
                value={charts}
                onValueChange={(value) => {
                  setCharts(value)
                  setModel(value)
                  handleOptionChange()
                }}
              >
                <SelectTrigger
                  id='charts'
                  className='items-start [&_[data-description]]:hidden'
                >
                  <SelectValue placeholder='Select charts to include' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='speed-altitude'>
                    Speed vs Altitude
                  </SelectItem>
                  <SelectItem value='depth-temperature'>
                    Depth vs Temperature
                  </SelectItem>
                  <SelectItem value='battery-usage'>Battery Usage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </fieldset>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>Messages</legend>
          <div className='grid gap-3'>
            <Label htmlFor='role'>Role</Label>
            <Select defaultValue='system'>
              <SelectTrigger>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='system'>System</SelectItem>
                <SelectItem value='user'>User</SelectItem>
                <SelectItem value='assistant'>Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='content'>Comment</Label>
            <Textarea
              id='content'
              placeholder='Special Observation...'
              className='min-h-[9.5rem]'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
                handleOptionChange()
              }}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Options
