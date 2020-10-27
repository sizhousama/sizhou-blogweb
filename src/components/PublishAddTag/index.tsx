import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Dispatch } from 'umi';
import { Loading } from '@/models/connect';
import { Tag, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {getTags} from '@/service/home'

interface PatProps {
  dispatch: Dispatch;
  catId:any;
  selectTag:any
}
interface TAG {
  label:string;
  value:string;
}
const {CheckableTag} = Tag

const PublishAddTag: React.FC<PatProps> = props => {
  const { dispatch,catId } = props;
  const [showInput,SetShowInput] = useState<number>(0)
  const [title,setTitle] = useState('')
  const [tags,setTags] = useState<TAG[]>([])
  const [selectTag,setSelectTag] = useState<TAG>({label:'',value:''})
  const onSelect = (id:string)=>{
    const tag = tags.find(item=>item.value===id)
    if(tag){
      props.selectTag(Number(id))
      setSelectTag(tag)
      SetShowInput(2)
    }
    return id
  }
  const onSearch = (v:string)=>{
    const params = {name:v,catId}
    getTags(params).then(res=>{
      const {data} = res
      let arr:any = []
      data.forEach((item:any)=>{
        const obj = {label:item.name,value:item.id.toString()}
        arr = [...arr,obj]
      })
      setTags(arr.slice())
    })
  }
  return (
    <>
    {
      showInput === 0 ?
      <Tag className={styles.tagPlus} onClick={()=>{SetShowInput(1);setTitle('')}}>
        <PlusOutlined /> 添加标签
      </Tag>:''
    }
    {
      showInput === 1?
      <AutoComplete
        size='small'
        autoFocus
        value={title}
        options={tags}
        className={styles.tagInput}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={(v:string)=>setTitle(v)}
        onBlur={()=>SetShowInput(0)}
      />:''
     }
     {
      showInput === 2?
      <CheckableTag  
        checked
        onChange={()=>SetShowInput(0)}
      >
        {selectTag.label}
      </CheckableTag>
      :''
     }
    </>
  );
};

export default connect(
  ({ loading }: { loading: Loading }) => ({
    loading: loading.models.draft,
  }),
)(PublishAddTag);
