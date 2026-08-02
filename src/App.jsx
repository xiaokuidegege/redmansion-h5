import { useEffect, useMemo, useRef, useState } from 'react'

const DESIGN_WIDTH = 393
const DESIGN_HEIGHT = 852
const HOME_MUSIC_SRC = ''
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const MONTH_CONFIGS = [
  {
    title: '正月',
    scene: '/assets/home/正月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 1,
    gregorianMonth: '2026年1月',
    ganzhiYear: '乙巳年',
    lunarMonth: '腊月',
    calendarLunarMonth: '腊月',
    eventMonth: '腊月',
    poem: ['除夕拜宗先', '扫尘祭灶毕', '廿三糖瓜甜', '腊八粥供佛'],
  },
  {
    title: '二月',
    scene: '/assets/home/二月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 2,
    gregorianMonth: '2026年2月',
    ganzhiYear: '乙巳年',
    lunarMonth: '正月',
    calendarLunarMonth: '正月',
    eventMonth: '正月',
    poem: ['祀祖庆新年', '焚香礼天地', '试奠五辛盘', '聊开柏叶酒'],
  },
  {
    title: '三月',
    scene: '/assets/home/三月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 3,
    gregorianMonth: '2026年3月',
    ganzhiYear: '丙午年',
    lunarMonth: '杏月',
    calendarLunarMonth: '二月',
    eventMonth: '二月',
    poem: ['花朝寿诞逢', '龙抬头占首', '祭日拜天宫', '裁度迎中和'],
  },
  {
    title: '四月',
    scene: '/assets/home/四月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 4,
    gregorianMonth: '2026年4月',
    ganzhiYear: '丙午年',
    lunarMonth: '桃月',
    calendarLunarMonth: '三月',
    eventMonth: '三月',
    poem: ['葬花泣残红', '探春开诗社', '清明扫墓同', '上巳祓禊日'],
  },
  {
    title: '五月',
    scene: '/assets/home/五月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 5,
    gregorianMonth: '2026年5月',
    ganzhiYear: '丙午年',
    lunarMonth: '槐月',
    calendarLunarMonth: '四月',
    eventMonth: '四月',
    poem: ['生辰夜宴浓', '饯花芒种至', '碧霞香火隆', '浴佛舍盐豆'],
  },
  {
    title: '六月',
    scene: '/assets/home/六月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 6,
    gregorianMonth: '2026年6月',
    ganzhiYear: '丙午年',
    lunarMonth: '榴月',
    calendarLunarMonth: '五月',
    eventMonth: '五月',
    poem: ['金玉梦初通', '清虚打醮毕', '端阳赏午中', '蒲艾驱五毒'],
  },
  {
    title: '七月',
    scene: '/assets/home/七月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 7,
    gregorianMonth: '2026年7月',
    ganzhiYear: '丙午年',
    lunarMonth: '荷月',
    calendarLunarMonth: '六月',
    eventMonth: '六月',
    poem: ['酌酒赏花', '结侣携觞', '芳草为茵', '柳槐垂荫'],
  },
  {
    title: '八月',
    scene: '/assets/home/八月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 8,
    gregorianMonth: '2026年8月',
    ganzhiYear: '丙午年',
    lunarMonth: '兰月',
    calendarLunarMonth: '七月',
    eventMonth: '七月',
    poem: ['抄检起波澜', '贾母庆八秩', '中元河灯阑', '七夕穿针巧'],
  },
  {
    title: '九月',
    scene: '/assets/home/九月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 9,
    gregorianMonth: '2026年9月',
    ganzhiYear: '丙午年',
    lunarMonth: '桂月',
    calendarLunarMonth: '八月',
    eventMonth: '八月',
    poem: ['蟹宴笑声连', '海棠咏白菊', '凸碧赏月圆', '中秋拜月毕'],
  },
  {
    title: '十月',
    scene: '/assets/home/十月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 10,
    gregorianMonth: '2026年10月',
    ganzhiYear: '丙午年',
    lunarMonth: '菊月',
    calendarLunarMonth: '九月',
    eventMonth: '九月',
    poem: ['鸳鸯抗婚言', '凤姐攒金庆', '九皇道场喧', '重阳登高饮'],
  },
  {
    title: '冬月',
    scene: '/assets/home/冬月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 11,
    gregorianMonth: '2026年11月',
    ganzhiYear: '丙午年',
    lunarMonth: '阳月',
    calendarLunarMonth: '十月',
    eventMonth: '十月',
    poem: ['失玉惹疑团', '送衣祭先祖', '芦广联诗篇', '下元诵经会'],
  },
  {
    title: '腊月',
    scene: '/assets/home/腊月.svg',
    gregorianYear: 2026,
    gregorianMonthNumber: 12,
    gregorianMonth: '2026年12月',
    ganzhiYear: '丙午年',
    lunarMonth: '冬月',
    calendarLunarMonth: '十一月',
    eventMonth: '冬月',
    poem: ['元妃病不安', '水仙添暖意', '数九盼春还', '消寒话家常'],
  },
]

const LUNAR_DAY_NAMES = [
  '',
  '初一',
  '初二',
  '初三',
  '初四',
  '初五',
  '初六',
  '初七',
  '初八',
  '初九',
  '初十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '廿一',
  '廿二',
  '廿三',
  '廿四',
  '廿五',
  '廿六',
  '廿七',
  '廿八',
  '廿九',
  '三十',
]

const lunarDateFormatter = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {
  month: 'long',
  day: 'numeric',
})

const EVENT_ICON_SRC = {
  solarTerm: '/assets/home/节气1.svg',
  birthday: '/assets/home/人物生辰·1.svg',
  festival: '/assets/home/重要节日1.svg',
}

const HOT_SEARCHES = ['元宵节', '大寒', '林黛玉', '贾宝玉', '中秋', '清明']

const LUNAR_EVENTS = {
  正月: {
    初一: [
      { type: 'birthday', label: '太祖', priority: true },
      { type: 'birthday', label: '元春', priority: false },
    ],
    初七: [{ type: 'festival', label: '人日', priority: false }],
    初九: [{ type: 'festival', label: '天诞', priority: false }],
    十五: [{ type: 'festival', label: '元宵', priority: false }],
    十九: [{ type: 'festival', label: '燕九', priority: false }],
    廿五: [{ type: 'festival', label: '填仓', priority: false }],
    三十: [{ type: 'festival', label: '打鬼', priority: false }],
  },
  二月: {
    初一: [{ type: 'festival', label: '中和', priority: false }],
    初二: [{ type: 'festival', label: '龙抬头', priority: false }],
    初三: [{ type: 'festival', label: '文昌', priority: false }],
    初四: [{ type: 'solarTerm', label: '惊蛰', priority: false }],
    初八: [{ type: 'festival', label: '出家', priority: false }],
    十二: [
      { type: 'birthday', label: '黛玉', priority: true },
      { type: 'birthday', label: '袭人', priority: false },
      { type: 'festival', label: '花朝', priority: false },
    ],
    十四: [{ type: 'solarTerm', label: '春分', priority: false }],
    十五: [{ type: 'festival', label: '老君', priority: false }],
    十九: [{ type: 'festival', label: '观音', priority: false }],
  },
  三月: {
    初二: [{ type: 'birthday', label: '探春', priority: false }],
    初三: [
      { type: 'festival', label: '上巳', priority: false },
      { type: 'festival', label: '蟠桃', priority: false },
    ],
    初五: [{ type: 'festival', label: '寒食', priority: false }],
    初六: [{ type: 'solarTerm', label: '清明', priority: false }],
    初九: [{ type: 'birthday', label: '贾琏', priority: false }],
  },
  四月: {
    初一: [{ type: 'birthday', label: '惜春', priority: false }],
    初二: [{ type: 'festival', label: '孟子', priority: false }],
    初五: [{ type: 'solarTerm', label: '立夏', priority: false }],
    初八: [{ type: 'festival', label: '浴佛', priority: false }],
    十四: [
      { type: 'birthday', label: '宝玉', priority: true },
      { type: 'birthday', label: '宝琴', priority: false },
      { type: 'birthday', label: '平儿', priority: false },
      { type: 'birthday', label: '岫烟', priority: false },
    ],
    十八: [{ type: 'festival', label: '碧霞', priority: false }],
    廿六: [{ type: 'solarTerm', label: '芒种', priority: false }],
    廿八: [{ type: 'festival', label: '药王', priority: false }],
  },
  五月: {
    初三: [{ type: 'birthday', label: '薛蟠', priority: false }],
    初五: [{ type: 'festival', label: '端午', priority: false }],
    十三: [{ type: 'festival', label: '关帝', priority: false }],
    十四: [{ type: 'solarTerm', label: '夏至', priority: false }],
    三十: [{ type: 'festival', label: '恶月', priority: false }],
  },
  六月: {
    十九: [{ type: 'festival', label: '观音', priority: false }],
    廿三: [{ type: 'festival', label: '祭马王', priority: false }],
    廿四: [{ type: 'festival', label: '关帝', priority: false }],
  },
  七月: {
    初二: [{ type: 'solarTerm', label: '立秋', priority: false }],
    初七: [
      { type: 'festival', label: '七夕', priority: true },
      { type: 'birthday', label: '巧姐', priority: false },
    ],
    十五: [{ type: 'festival', label: '中元', priority: false }],
    三十: [{ type: 'festival', label: '地藏', priority: false }],
  },
  八月: {
    十五: [{ type: 'festival', label: '中秋', priority: false }],
    廿七: [{ type: 'festival', label: '孔子', priority: false }],
  },
  九月: {
    初一: [{ type: 'festival', label: '斗母', priority: false }],
    初二: [
      { type: 'birthday', label: '凤姐', priority: false },
      { type: 'birthday', label: '金钏', priority: false },
    ],
    初九: [{ type: 'festival', label: '重阳', priority: false }],
    十三: [{ type: 'festival', label: '望雨', priority: false }],
    十九: [{ type: 'festival', label: '观音', priority: false }],
  },
  十月: {
    初一: [{ type: 'festival', label: '寒衣', priority: false }],
    十五: [{ type: 'festival', label: '下元', priority: false }],
  },
  冬月: {
    初一: [{ type: 'festival', label: '消寒', priority: false }],
    初六: [{ type: 'solarTerm', label: '冬至', priority: false }],
    廿五: [{ type: 'festival', label: '数九', priority: false }],
  },
  腊月: {
    初八: [{ type: 'festival', label: '腊八', priority: false }],
    十八: [{ type: 'solarTerm', label: '立春', priority: false }],
    廿三: [{ type: 'festival', label: '祭灶', priority: false }],
    廿五: [{ type: 'festival', label: '上帝', priority: false }],
    三十: [{ type: 'festival', label: '除夕', priority: false }],
  },
}

function getLunarDateParts(date) {
  const parts = lunarDateFormatter.formatToParts(date)
  const monthPart = parts.find((part) => part.type === 'month')
  const dayPart = parts.find((part) => part.type === 'day')
  const day = Number(dayPart?.value)

  return {
    monthName: monthPart?.value || '',
    dayName: LUNAR_DAY_NAMES[day] || '',
  }
}

function getLunarEvents(lunarMonth, lunarDayName) {
  return LUNAR_EVENTS[lunarMonth]?.[lunarDayName] || []
}

function normalizeEventMonthName(lunarMonthName) {
  const monthName = lunarMonthName.replace(/^闰/, '')

  if (monthName === '十一月') return '冬月'
  if (monthName === '十二月') return '腊月'

  return monthName
}

function selectVisibleEvents(events) {
  if (events.length === 0) return []

  const typeRank = {
    solarTerm: 0,
    festival: 1,
    birthday: 2,
  }

  const sortedEvents = [...events].sort((a, b) => {
    const typeDiff = typeRank[a.type] - typeRank[b.type]
    if (typeDiff !== 0) return typeDiff
    return Number(b.priority) - Number(a.priority)
  })

  return sortedEvents.map((event, index) => ({
    ...event,
    showLabel: index === 0,
  }))
}

function buildCalendarDays(config) {
  const year = config.gregorianYear
  const monthIndex = config.gregorianMonthNumber - 1
  const today = new Date()
  const firstDate = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const leadingBlankCount = firstDate.getDay()
  const cells = []

  for (let index = 0; index < 42; index += 1) {
    const dateNumber = index - leadingBlankCount + 1

    if (dateNumber < 1 || dateNumber > daysInMonth) {
      cells.push({ id: `blank-${index}`, empty: true })
      continue
    }

    const date = new Date(year, monthIndex, dateNumber)
    const { monthName: realLunarMonthName, dayName: lunarDayName } =
      getLunarDateParts(date)
    const rawEvents = getLunarEvents(
      normalizeEventMonthName(realLunarMonthName),
      lunarDayName,
    )

    cells.push({
      id: `${year}-${config.gregorianMonthNumber}-${dateNumber}`,
      dateNumber,
      lunarText:
        lunarDayName === '初一'
          ? realLunarMonthName || config.calendarLunarMonth || config.lunarMonth
          : lunarDayName,
      rawEvents,
      events: selectVisibleEvents(rawEvents),
      isToday:
        today.getFullYear() === year &&
        today.getMonth() === monthIndex &&
        today.getDate() === dateNumber,
    })
  }

  return cells
}

function createMonthConfig(year, monthNumber) {
  const baseConfig = MONTH_CONFIGS[monthNumber - 1]

  return {
    ...baseConfig,
    gregorianYear: year,
    gregorianMonthNumber: monthNumber,
    gregorianMonth: `${year}年${monthNumber}月`,
  }
}

function getEventTypeLabel(type) {
  if (type === 'solarTerm') return '节气'
  if (type === 'birthday') return '人物生辰'
  return '重要节日'
}

function getSearchAliases(label) {
  const aliases = {
    太祖: '太祖太爷 贾源',
    元春: '贾元春',
    元宵: '元宵节 上元节',
    黛玉: '林黛玉',
    袭人: '花袭人',
    探春: '贾探春 探春开诗社 海棠诗社',
    贾琏: '贾琏',
    惜春: '贾惜春',
    宝玉: '贾宝玉',
    宝琴: '薛宝琴',
    平儿: '平儿',
    岫烟: '邢岫烟',
    薛蟠: '薛蟠',
    巧姐: '巧姐',
    凤姐: '王熙凤 凤姐',
    金钏: '金钏',
  }

  return aliases[label] || ''
}

function createSearchItems(baseYear = 2026) {
  const items = []

  for (let monthNumber = 1; monthNumber <= 12; monthNumber += 1) {
    const config = createMonthConfig(baseYear, monthNumber)
    const days = buildCalendarDays(config)

    days.forEach((day) => {
      if (day.empty) return

      const dateObj = new Date(
        config.gregorianYear,
        config.gregorianMonthNumber - 1,
        day.dateNumber,
      )
      const { monthName, dayName } = getLunarDateParts(dateObj)
      const lunarDate = `${normalizeEventMonthName(monthName)}${dayName}`
      const date = `${config.gregorianYear}年${config.gregorianMonthNumber}月${day.dateNumber}日`

      day.rawEvents.forEach((event) => {
        items.push({
          id: `${config.gregorianYear}-${config.gregorianMonthNumber}-${day.dateNumber}-${event.type}-${event.label}`,
          year: config.gregorianYear,
          monthNumber: config.gregorianMonthNumber,
          dateNumber: day.dateNumber,
          date,
          lunarDate,
          type: event.type,
          typeLabel: getEventTypeLabel(event.type),
          title: event.label,
          searchText: `${date} ${lunarDate} ${getEventTypeLabel(event.type)} ${event.label} ${getSearchAliases(event.label)}`,
        })
      })
    })
  }

  return items
}

function App() {
  const pageRef = useRef(null)
  const audioRef = useRef(null)
  const pointerStartRef = useRef(null)
  const [currentMonth, setCurrentMonth] = useState({
    year: 2026,
    monthNumber: 2,
  })
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [view, setView] = useState('home')
  const [searchText, setSearchText] = useState('')
  const [detailItem, setDetailItem] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const monthConfig = useMemo(
    () => createMonthConfig(currentMonth.year, currentMonth.monthNumber),
    [currentMonth],
  )
  const calendarDays = useMemo(() => buildCalendarDays(monthConfig), [monthConfig])
  const searchItems = useMemo(() => createSearchItems(2026), [])
  const searchResults = useMemo(() => {
    const query = searchText.trim()
    if (!query) return []

    return searchItems
      .filter((item) => item.searchText.includes(query))
      .slice(0, 30)
  }, [searchItems, searchText])

  function showPreviousMonth() {
    setCurrentMonth((current) => {
      if (current.monthNumber === 1) {
        return {
          year: current.year - 1,
          monthNumber: 12,
        }
      }

      return {
        year: current.year,
        monthNumber: current.monthNumber - 1,
      }
    })
  }

  function showNextMonth() {
    setCurrentMonth((current) => {
      if (current.monthNumber === 12) {
        return {
          year: current.year + 1,
          monthNumber: 1,
        }
      }

      return {
        year: current.year,
        monthNumber: current.monthNumber + 1,
      }
    })
  }

  function showTodayMonth() {
    const today = new Date()
    const todayDate = {
      year: today.getFullYear(),
      monthNumber: today.getMonth() + 1,
      dateNumber: today.getDate(),
    }

    setCurrentMonth(todayDate)
    setSelectedDate(todayDate)
    setView('home')
  }

  function openSearch() {
    setSearchText('')
    setView('search')
  }

  function openSearchResult(result) {
    const resultDate = {
      year: result.year,
      monthNumber: result.monthNumber,
      dateNumber: result.dateNumber,
    }

    setCurrentMonth(resultDate)
    setSelectedDate(resultDate)
    setDetailItem(result)
    setView('home')
  }

  function handlePointerDown(event) {
    if (view !== 'home') return

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  function handlePointerUp(event) {
    if (view !== 'home') return
    if (!pointerStartRef.current) return

    const deltaX = event.clientX - pointerStartRef.current.x
    const deltaY = event.clientY - pointerStartRef.current.y
    pointerStartRef.current = null

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return

    if (deltaX < 0) {
      showNextMonth()
      return
    }

    showPreviousMonth()
  }

  function toggleMusic() {
    setIsMusicPlaying((current) => {
      const next = !current
      const audio = audioRef.current

      if (audio && HOME_MUSIC_SRC) {
        if (next) {
          audio.play().catch(() => setIsMusicPlaying(false))
        } else {
          audio.pause()
        }
      }

      return next
    })
  }

  useEffect(() => {
    function resizePage() {
      const page = pageRef.current
      if (!page) return

      const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT,
      )
      page.style.transform = `scale(${scale})`
    }

    resizePage()
    window.addEventListener('resize', resizePage)
    window.addEventListener('load', resizePage)

    return () => {
      window.removeEventListener('resize', resizePage)
      window.removeEventListener('load', resizePage)
    }
  }, [])

  return (
    <div className="viewport">
      <main
        ref={pageRef}
        className={`page ${
          view === 'copyright'
            ? 'copyright-page'
            : view === 'search'
              ? 'search-page'
              : view === 'detail'
                ? 'detail-page'
              : 'home-page'
        }`}
        aria-label={
          view === 'copyright'
            ? '版权信息'
            : view === 'search'
              ? '红楼岁时搜索'
              : view === 'detail'
                ? '每日详情'
              : `${monthConfig.title}月历`
        }
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {view === 'home' && (
          <>
            <img className="nav-today" src={assetUrl('/assets/home/今日.svg')} alt="今" />
            <img className="nav-search" src={assetUrl('/assets/home/搜索.svg')} alt="搜索" />
            <img className="lantern" src={assetUrl('/assets/home/i.svg')} alt="" />
            <img className="month-scene" src={assetUrl(monthConfig.scene)} alt="" />
            <div className="poem-text" aria-label={`${monthConfig.title}诗词`}>
              <div className="poem-lines" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="poem-columns">
                {monthConfig.poem.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
            <h1 className="month-title">{monthConfig.title}</h1>
            <p className="month-note">
              {monthConfig.gregorianMonth}
              <br />
              {monthConfig.ganzhiYear} {monthConfig.lunarMonth}
            </p>
            <section className="calendar-panel" aria-label={`${monthConfig.title}日历`}>
              <img className="calendar-border" src={assetUrl('/assets/home/边框.svg')} alt="" />
              <div className="calendar-grid">
                {calendarDays.map((day) => {
                  const isSelected =
                    !day.empty &&
                    selectedDate &&
                    selectedDate.year === currentMonth.year &&
                    selectedDate.monthNumber === currentMonth.monthNumber &&
                    selectedDate.dateNumber === day.dateNumber
                  const shouldHighlight = selectedDate ? isSelected : day.isToday

                  return (
              <div
                key={day.id}
                className={`calendar-cell${day.empty ? ' is-empty' : ''}${shouldHighlight ? ' is-today' : ''}`}
                aria-hidden={day.empty ? 'true' : undefined}
              >
                    {!day.empty && (
                      <>
                    <span className="calendar-date">{day.dateNumber}</span>
                    <span className="calendar-lunar">{day.lunarText}</span>
                    {day.events.length > 0 && (
                      <span className="calendar-events" aria-label="日历事件">
                        {day.events.map((event) => (
                          <span
                            className="calendar-event"
                            key={`${event.type}-${event.label}`}
                          >
                            <img src={assetUrl(EVENT_ICON_SRC[event.type])} alt="" />
                            {event.showLabel && <span>{event.label}</span>}
                          </span>
                        ))}
                      </span>
                    )}
                  </>
                )}
                  </div>
                  )
                })}
              </div>
            </section>
            <div className="legend">
              <span className="legend-item legend-flower">节气</span>
              <span className="legend-item legend-person">人物生辰</span>
              <span className="legend-item legend-festival">重要节日</span>
            </div>
            <button
              className="hotspot hotspot-today"
              type="button"
              aria-label="回到今日"
              onClick={showTodayMonth}
            />
            <button
              className="hotspot hotspot-search"
              type="button"
              aria-label="搜索"
              onClick={openSearch}
            />
            <button
              className="hotspot hotspot-info"
              type="button"
              aria-label="版权信息"
              onClick={() => setView('copyright')}
            />
          </>
        )}
        {view === 'copyright' && (
          <>
            <img
              className="copyright-page-art"
              src={assetUrl('/assets/home/版权信息页.svg')}
              alt="版权信息"
            />
            <button
              className="copyright-back"
              type="button"
              aria-label="返回首页"
              onClick={() => setView('home')}
            >
              <img src={assetUrl('/assets/home/返回键.svg')} alt="" />
            </button>
          </>
        )}
        {view === 'search' && (
          <>
            <button
              className="copyright-back"
              type="button"
              aria-label="返回首页"
              onClick={() => setView('home')}
            >
              <img src={assetUrl('/assets/home/返回键.svg')} alt="" />
            </button>
            <h1 className="search-title">岁时检索</h1>
            <section className="search-panel" aria-label="红楼岁时内容查询">
              <label className="search-box">
                <span>搜</span>
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="人物、节气、节日、日期"
                  autoComplete="off"
                />
              </label>
              <div className="search-results">
                {!searchText.trim() && (
                  <div className="hot-searches" aria-label="热门搜索">
                    <h2>热门搜索</h2>
                    <div className="hot-search-list">
                      {HOT_SEARCHES.map((keyword) => (
                        <button
                          key={keyword}
                          type="button"
                          onClick={() => setSearchText(keyword)}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {searchText.trim() &&
                  searchResults.map((result) => (
                    <button
                      className="search-result"
                      key={result.id}
                      type="button"
                      onClick={() => openSearchResult(result)}
                    >
                      <span className="search-result-date">
                        {result.date}　{result.lunarDate}
                      </span>
                      <span className="search-result-main">
                        <span>{result.typeLabel}</span>
                        <strong>{result.title}</strong>
                      </span>
                    </button>
                  ))}
                {searchText.trim() && searchResults.length === 0 && (
                  <p className="search-empty">未检得相关岁时条目</p>
                )}
              </div>
            </section>
          </>
        )}
        {view === 'detail' && detailItem && (
          <>
            <button
              className="copyright-back"
              type="button"
              aria-label="返回搜索"
              onClick={() => setView('search')}
            >
              <img src={assetUrl('/assets/home/返回键.svg')} alt="" />
            </button>
            <h1 className="detail-title">岁时详情</h1>
            <section className="detail-card" aria-label="每日详情">
              <p className="detail-date">{detailItem.date}</p>
              <p className="detail-lunar">{detailItem.lunarDate}</p>
              <div className="detail-type">{detailItem.typeLabel}</div>
              <h2>{detailItem.title}</h2>
              <button
                className="detail-calendar-link"
                type="button"
                onClick={() => setView('home')}
              >
                查看月历
              </button>
            </section>
          </>
        )}
        {HOME_MUSIC_SRC && <audio ref={audioRef} src={HOME_MUSIC_SRC} loop preload="auto" />}
        <img
          className="copyright-button"
          src={isMusicPlaying ? assetUrl('/assets/home/button_pause.png') : assetUrl('/assets/home/button_play.png')}
          alt={isMusicPlaying ? '暂停音乐' : '播放音乐'}
        />
        <button
          className="hotspot hotspot-copyright"
          type="button"
          aria-label={isMusicPlaying ? '暂停音乐' : '播放音乐'}
          onClick={toggleMusic}
        />
      </main>
    </div>
  )
}

export default App
