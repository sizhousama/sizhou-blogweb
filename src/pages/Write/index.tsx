import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'dva';
import { WriteState } from '@/models/connect';
import { Dispatch } from 'umi';
import moment from 'moment';
import {
  Input,
  Row,
  Col,
  Button,
  Popover,
  Tag,
  Dropdown,
  Menu,
  Drawer,
  List,
  Modal,
  Table,
} from 'antd';
import {
  CaretDownOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { history, Link } from 'umi';
import MathJax from 'react-mathjax';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Markdown from '@/components/Markdown';
import UserAvatar from '@/components/UserAvatar';

import styles from './index.less';
const { TextArea } = Input;
interface WriteProps {
  dispatch: Dispatch;
  write: WriteState;
}
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
  const { dispatch, write } = props;
  const { markdown, title } = write;
  const [mdshow, setMdshow] = useState(true);
  const [showPublish, setShowPublish] = useState(false);
  const inputRef = useRef<any>();
  const textAreaRef = useRef<any>();

  const onChangeMarkdown = (e: any) => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: { markdown: e.target.value },
      });
    }
  };
  const onChangeTitle = (e: any) => {
    if (dispatch) {
      dispatch({ type: 'write/setTitle', payload: { title: e.target.value } });
    }
  };
  const setMarkdown = (el: any, data: any, start: any, num: number) => {
    if (dispatch) {
      const { selectionStart, selectionEnd } = el;
      dispatch({
        type: 'write/setMarkdown',
        payload: {
          markdown: [
            markdown.substring(0, selectionStart),
            data,
            markdown.substring(selectionEnd),
          ].join(''),
        },
      });
      el.focus();
      el.setSelectionRange(
        selectionStart + start,
        selectionStart + start + num,
      );
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

  const togglePut = () => {
    setMdshow(!mdshow);
  };

  const pubArt = () => {};

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
            <Button className="mr_20" type="primary">
              保存草稿
            </Button>
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
              <MathJax.Provider input="tex">
                <Markdown markdown={markdown} />
              </MathJax.Provider>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title="发布文章"
        visible={showPublish}
        onOk={pubArt}
        onCancel={() => setShowPublish(false)}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <h4 style={{ marginBottom: 16 }}>分类</h4>
          <div>
            {/* {categories &&
          categories.map(category => (
            <CheckableTag
              key={category.en_name}
              checked={category.id === selectedCategory}
              onChange={selected => checkCategorysHandle(category)}
            >
              {category.name}
            </CheckableTag>
          ))} */}
          </div>
          <h4 style={{ marginBottom: 16, marginTop: 10 }}>标签</h4>
          <div>
            {/* {tags &&
          tags.map(tag => (
            <CheckableTag
              key={tag.en_name}
              checked={tag.id === selectedTag}
              onChange={() => checkTagHandle(tag)}
            >
              {tag.name}
            </CheckableTag>
          ))} */}
          </div>
          <h4 style={{ marginBottom: 16, marginTop: 10 }}>文章封面图</h4>
          <div>
            {/* <AliOssUpload type="click" returnImageUrl={returnCoverImageUrl} /> */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect(({ write }: { write: WriteState }) => ({
  write,
}))(Write);
