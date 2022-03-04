import React, { useState, useEffect, useRef, useCallback } from 'react';
import Markdown from '@/components/Markdown';
import UserAvatar from '@/components/UserAvatar';
import PublishAddTag from '@/components/PublishAddTag';
import SettingCoverImg from '@/components/SettingCoverImg';
import { getCategories } from '@/service/home';
import { delDraft, addArticle, updateArticle } from '@/service/draft';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'dva';
import { WriteState, DraftState } from '@/models/connect';
import { Dispatch } from 'umi';
import './markdown-github.css';
import './markdown.css';
import {
  Input,
  Row,
  Col,
  Button,
  Popover,
  Tag,
  Modal,
  Table,
  message,
} from 'antd';
import {
  PictureOutlined,
  QuestionCircleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import MathJax from 'react-mathjax';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import styles from './index.less';

const { TextArea } = Input;
const { CheckableTag } = Tag;
interface WriteProps {
  dispatch: Dispatch;
  write: WriteState;
  draft: DraftState;
  match: any;
}
interface TAG {
  id: number;
  name: string;
}
interface Draft {
  id: number;
  markdown: string;
  title: string;
  cover: string;
  tag: TAG;
  category_id: number;
}
// 定义快捷方式
const ShortCutKey = () => {
  const columns = [
    {
      title: 'Markdown',
      dataIndex: 'markdown',
      key: 'markdown',
    },
    {
      title: '说明',
      dataIndex: 'explain',
      key: 'explain',
    },
    {
      title: '快捷键',
      dataIndex: 'keybord',
      key: 'keybord',
    },
  ];
  const dataSource = [
    {
      markdown: '## 标题',
      explain: 'H2',
      keybord: 'Ctrl / ⌘ + H',
    },
    {
      markdown: '**文本**',
      explain: '加粗',
      keybord: 'Ctrl / ⌘ + B',
    },
    {
      markdown: '*文本*',
      explain: '斜体',
      keybord: 'Ctrl / ⌘ + Alt + I',
    },
    {
      markdown: '[描述](链接)',
      explain: '链接',
      keybord: 'Ctrl / ⌘ + L',
    },
    {
      markdown: '![描述](链接)',
      explain: '插入图片',
      keybord: 'Ctrl / ⌘ + I',
    },
    {
      markdown: '> 引用',
      explain: '引用',
      keybord: 'Ctrl / ⌘ + Q',
    },
    {
      markdown: '```code```',
      explain: '代码块',
      keybord: 'Ctrl / ⌘ + Alt + C',
    },
    {
      markdown: '`code`',
      explain: '行代码块',
      keybord: 'Ctrl / ⌘ + Alt + K',
    },
    {
      markdown: '省略',
      explain: '表格',
      keybord: 'Ctrl / ⌘ + Alt + T',
    },
  ];
  return (
    <>
      <div className={styles.qktitle}>快捷键</div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        rowKey="markdown"
      />
    </>
  );
};
const Write: React.FC<WriteProps> = props => {
  const { dispatch, write, draft } = props;
  const { markdown, title, curArtId } = write;
  const { draftDetail } = draft;
  const childRef = useRef<any>();
  const [saveTips, setSaveTips] = useState('文章将会自动保存至');
  const [selectCat, setSelectCat] = useState<number>();
  const [selectTagId, setSelectTagId] = useState<number | null>();
  const [tagobj, initTag] = useState<any>();
  const [categorys, setCategorys] = useState<any[]>([]);
  const [mdshow, setMdshow] = useState(true);
  const [showPublish, setShowPublish] = useState(false);
  const [coverImg, setCoverImg] = useState('');
  const inputRef = useRef<any>();
  const textAreaRef = useRef<any>();

  useEffect(() => {
    initCats();
    return function() {
      clearDraft();
    };
  }, []);
  // 初始化类别
  const initCats = () => {
    getCategories().then(res => {
      const { data } = res;
      setCategorys(data.slice());
      setSelectCat(data[0].id);
      initDraft(data[0].id);
    });
  };
  const initDraft = (catId: number) => {
    const params = props.match.params.id;
    if (params === 'new') {
      createDraft(catId);
    } else {
      const payload = { id: params };
      dispatch({
        type: 'draft/draft',
        payload,
        callback(data: Draft) {
          const { markdown, title, cover, tag, category_id } = data;
          dispatch({ type: 'write/setMarkdown', payload: { markdown } });
          dispatch({ type: 'write/setTitle', payload: { title } });
          category_id ? setSelectCat(category_id) : '';
          cover ? setCoverImg(cover) : '';
          if (tag) {
            const obj = { label: tag.name, value: tag.id };
            initTag(obj);
            setSelectTagId(tag.id);
          }
        },
      });
    }
  };
  const createDraft = (catId: number) => {
    if (dispatch) {
      const payload = { title: '', markdown: '', catId };
      dispatch({
        type: 'draft/adddraft',
        payload,
        callback(data: Draft) {
          dispatch({ type: 'draft/save', payload: { draftDetail: data } });
          dispatch({ type: 'write/setMarkdown', payload: { markdown: '' } });
          dispatch({ type: 'write/setTitle', payload: { title: '' } });
          history.push(`/write/${data.id}`);
        },
      });
    }
  };
  const clearDraft = () => {
    dispatch({ type: 'write/save', payload: { curArtId: '' } });
    dispatch({ type: 'draft/save', payload: { draftDetail: '' } });
  };
  const onChangeMarkdown = (e: any) => {
    const markdown = e.target.value;
    const obj = {
      title,
      markdown,
      catId: selectCat,
      tagId: selectTagId,
      coverImg,
    };
    saveDraft(obj);
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: { markdown },
      });
    }
  };
  const onChangeTitle = (e: any) => {
    const title = e.target.value;
    const obj = {
      title,
      markdown,
      catId: selectCat,
      tagId: selectTagId,
      coverImg,
    };
    saveDraft(obj);
    if (dispatch) {
      dispatch({ type: 'write/setTitle', payload: { title } });
    }
  };
  const setMarkdown = (el: any, data: any, start: any, num: number) => {
    if (dispatch) {
      const { selectionStart, selectionEnd } = el;
      const md = [
        markdown.substring(0, selectionStart),
        data,
        markdown.substring(selectionEnd),
      ].join('');
      dispatch({
        type: 'write/setMarkdown',
        payload: {
          markdown: md,
        },
      });
      el.focus();
      el.setSelectionRange(
        selectionStart + start,
        selectionStart + start + num,
      );
      const obj = {
        title,
        markdown: md,
        catId: selectCat,
        tagId: selectTagId,
        coverImg,
      };
      saveDraft(obj);
    }
  };
  const addBold = (el: any) => {
    setMarkdown(el, '**加粗**', 2, 2);
  };
  const addItalic = (el: any) => {
    setMarkdown(el, '*斜体*', 1, 2);
  };
  const addImage = (el: any) => {
    setMarkdown(el, '![描述](链接)', 6, 2);
  };
  const addLink = (el: any) => {
    setMarkdown(el, '[描述](链接)', 5, 2);
  };
  const addCode = (el: any) => {
    setMarkdown(el, '\n```\n```', 4, 0);
  };
  const addLineCode = (el: any) => {
    setMarkdown(el, '``', 1, 0);
  };
  const addQuote = (el: any) => {
    setMarkdown(el, '\n> 引用', 3, 2);
  };
  const addTable = (el: any) => {
    setMarkdown(
      el,
      '\n\n| Col1 | Col2 | Col3 |\n| :----: | :----: | :----: |\n| field1 | field2 | field3 |\n',
      4,
      4,
    );
  };
  const addHeading = (el: any) => {
    let title = '## 标题';
    let start = 3;
    if (markdown) {
      title = '\n## 标题';
      start = 4;
    }
    setMarkdown(el, title, start, 2);
  };
  const onKeyEvent = (key: any, e: any) => {
    e.preventDefault();
    switch (key) {
      case 'ctrl+b':
        addBold(e.target);
        break;
      case 'ctrl+h':
        addHeading(e.target);
        break;
      case 'ctrl+l':
        addLink(e.target);
        break;
      case 'ctrl+alt+t':
        addTable(e.target);
        break;
      case 'ctrl+i':
        addImage(e.target);
        break;
      case 'ctrl+q':
        addQuote(e.target);
        break;
      case 'ctrl+alt+i':
        addItalic(e.target);
        break;
      case 'ctrl+alt+c':
        addCode(e.target);
        break;
      case 'ctrl+alt+k':
        addLineCode(e.target);
        break;
      default:
        break;
    }
  };
  // 防抖hooks
  const useDebounce = (fn: any, delay: number, dep = []) => {
    const { current } = useRef<{ fn: any; timer: any }>({ fn, timer: null });
    useEffect(
      function() {
        current.fn = fn;
      },
      [fn],
    );

    return useCallback(function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    }, dep);
  };
  const saveDraft = useDebounce((obj: any) => {
    setSaveTips('正在保存至');
    const { title, markdown, catId, tagId, coverImg } = obj;
    const { id } = draftDetail;
    const payload = {
      id,
      title,
      markdown,
      catId,
      tagId,
      coverImg,
    };
    dispatch({
      type: 'draft/updraft',
      payload,
      callback(data) {
        setSaveTips('已保存至');
      },
    });
  }, 500);

  const togglePut = () => {
    setMdshow(!mdshow);
  };

  // 选择类别
  const handleSelectCat = (catId: any) => {
    const obj = { title, markdown, catId, tagId: selectTagId, coverImg };
    childRef.current.clear();
    setSelectCat(catId);
    setSelectTagId(null);
    saveDraft(obj);
  };
  // 选择标签
  const handleSelectTag = (tagId: any) => {
    const obj = { title, markdown, catId: selectCat, tagId, coverImg };
    setSelectTagId(tagId);
    saveDraft(obj);
  };
  const setcoverimg = (img: string) => {
    const obj = {
      title,
      markdown,
      catId: selectCat,
      tagId: selectTagId,
      coverImg: img,
    };
    setCoverImg(img);
    saveDraft(obj);
  };
  const publistArt = () => {
    if (!title) {
      message.error('请输入标题！');
      return false;
    }
    if (!markdown) {
      message.error('请输入文章内容！');
      return false;
    }
    if (!selectTagId) {
      message.error('请选择标签！');
      return false;
    }
    const { id, status } = draftDetail;
    const fun = status === 2 ? updateArticle : addArticle;
    const params: any = {
      draftId: id,
      markdown,
      title,
      selectedTag: selectTagId,
      selectedCategory: selectCat,
      coverImageUrl: coverImg,
      html: ReactDOMServer.renderToString(
        <MathJax.Provider>
          <Markdown markdown={markdown} />
        </MathJax.Provider>,
      ),
    };
    status === 2 && curArtId ? (params.id = curArtId) : '';
    fun(params).then(res => {
      if (res.status === 1) {
        message.success('发布成功！');
        delDraft({ id });
        setTimeout(() => {
          history.push('/userPage');
        }, 1000);
      }
    });
  };

  return (
    <>
      <Row>
        <Col span={18}>
          <div className={`fl ${styles.topTitle}`}>
            <Input
              className="ftw_b ft_18"
              value={title}
              bordered={false}
              onChange={onChangeTitle}
              size="large"
              placeholder="请输入标题"
              ref={inputRef}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className={`fl ${styles.topOpt}`}>
            <Popover
              placement="bottom"
              overlayStyle={{ width: 350 }}
              content={<ShortCutKey />}
            >
              <QuestionCircleOutlined
                className={`cp mr_20 ${styles.normalIcon}`}
              />
            </Popover>
            <div className={`fl ${styles.saveDraft}`}>
              <span className={styles.tip}>{saveTips}</span>
              <Button
                type="primary"
                className="mr_20"
                onClick={() => history.push('/drafts')}
              >
                草稿箱
              </Button>
            </div>
            <Button
              className="mr_20"
              type="primary"
              onClick={() => setShowPublish(true)}
            >
              发布
            </Button>
            <UserAvatar from="w"></UserAvatar>
          </div>
        </Col>
      </Row>
      <Row style={{ borderTop: '1px solid #ddd' }}>
        <Col span={mdshow ? 12 : 24}>
          <div className={`cp ${styles.upimg}`}>
            <PictureOutlined className={styles.normalIcon} />
          </div>
          <div className={`cp ${styles.rightarr}`}>
            {mdshow ? (
              <VerticalAlignTopOutlined
                onClick={togglePut}
                className={styles.putright}
              />
            ) : (
              <VerticalAlignTopOutlined
                onClick={togglePut}
                className={styles.putleft}
              />
            )}
          </div>
          <div className={`${styles.writeArea} ${mdshow ? '' : styles.mdarea}`}>
            <KeyboardEventHandler
              handleKeys={[
                'ctrl+b',
                'ctrl+l',
                'ctrl+h',
                'ctrl+alt+t',
                'ctrl+i',
                'ctrl+alt+i',
                'ctrl+alt+c',
                'ctrl+alt+k',
                'ctrl+q',
              ]}
              onKeyEvent={onKeyEvent}
            >
              <TextArea
                bordered={false}
                autoSize={true}
                className={styles.textareScroll}
                placeholder="开始写作（markdown格式）"
                rows={3}
                onChange={onChangeMarkdown}
                value={markdown}
                ref={textAreaRef}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
              />
            </KeyboardEventHandler>
          </div>
        </Col>
        <Col span={mdshow ? 12 : 0}>
          <div style={{ height: '100%', background: '#fff', padding: 20 }}>
            <div className="markdown-body">
              <MathJax.Provider>
                <Markdown markdown={markdown} />
              </MathJax.Provider>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title="发布文章"
        visible={showPublish}
        onOk={publistArt}
        onCancel={() => setShowPublish(false)}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <h4 style={{ marginBottom: 10 }}>分类</h4>
          <div>
            {categorys &&
              categorys.map(cat => (
                <CheckableTag
                  key={cat.en_name}
                  checked={cat.id === selectCat}
                  onChange={() => handleSelectCat(cat.id)}
                >
                  {cat.name}
                </CheckableTag>
              ))}
          </div>
          <h4 style={{ marginBottom: 10, marginTop: 10 }}>标签</h4>
          <div>
            <PublishAddTag
              cRef={childRef}
              catId={selectCat}
              selectTag={(id: number) => handleSelectTag(id)}
              initTag={tagobj}
            />
          </div>
          <h4 style={{ marginBottom: 10, marginTop: 10 }}>文章封面图</h4>
          <div>
            <SettingCoverImg
              url={coverImg}
              setCoverImg={(img: string) => setcoverimg(img)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect(
  ({ write, draft }: { write: WriteState; draft: DraftState }) => ({
    write,
    draft,
  }),
)(Write);
