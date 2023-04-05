import React, { useState } from 'react'
import HeroSlide from '../../../components/hero-slide/HeroSlide'
import DiscoverGrid from '../../../components/discover-grid/DiscoverGrid';
import FilterPanel from '../../../components/filter-panel/FilterPanel';
import discoverStyle from "../discover.module.css"
import { useRouter } from 'next/router';

const Discover = (props) => {
  const [filterParams, setFilterParams] = useState();
  const router = useRouter();
  const { locale } = router;
  const language = locale;

  return (
    <>
      
      <HeroSlide mvtvType={'tv'}  language={language}></HeroSlide>
      <div className={`${discoverStyle.discoverWrapper} container-xxl d-flex`}>
        <FilterPanel setParams={setFilterParams} mvtvType={props.mvtvType} language={language}></FilterPanel>
        <DiscoverGrid filterParams={filterParams} mvtvType={'tv'} language={language} />
      </div>
    </>
  )
}

export default Discover