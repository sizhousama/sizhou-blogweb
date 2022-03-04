import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { Anchor } from 'antd';
import { Dispatch, connect } from 'umi';
import { DetailState } from '@/models/connect';
const { Link } = Anchor;
interface ANCHOR {
  detail: DetailState;
}
const ArticleAchor: React.FC<ANCHOR> = props => {
  const { detail } = props;
  const { artDetail } = detail;
  const [anchors, setAnchors] = useState<any>([]);
  const domref = useRef<any>();
  useEffect(() => {
    initAnchor();
  }, [artDetail.id]);
  const initAnchor = () => {
    domref.current = document.getElementsByClassName('fw-700');
    const a = domref.current;
    const h2arr: any[] = [];
    let k = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i].nodeName === 'H2') {
        const h3arr = [];
        k++;
        let m = 0;
        for (let j = i + 1; j < a.length; j++) {
          if (a[j].nodeName === 'H3') {
            m++;
            const h3id = `anchor_${k}_${m}`;
            a[j].id = h3id;
            const obj = {
              id: h3id,
              name: a[j].innerHTML,
            };
            h3arr.push(obj);
          }
          if (a[j].nodeName === 'H2') {
            break;
          }
        }
        const h2id = `anchor_${k}`;
        a[i].id = h2id;
        const obj = {
          id: h2id,
          name: a[i].innerHTML,
          nodes: h3arr,
        };
        h2arr.push(obj);
      }
    }
    setAnchors([...h2arr]);
  };
  return (
    <>
      <Anchor className={styles.anchorbox} offsetTop={100}>
        <div className={styles.title}>目录</div>
        {anchors &&
          anchors.map((parent: any) => {
            return (
              <Link key={parent.id} href={`#${parent.id}`} title={parent.name}>
                {parent.nodes.length > 0 &&
                  parent.nodes.map((child: any) => {
                    return (
                      <Link
                        key={child.id}
                        href={`#${child.id}`}
                        title={child.name}
                      />
                    );
                  })}
              </Link>
            );
          })}
      </Anchor>
    </>
  );
};

export default connect(({ detail }: { detail: DetailState }) => ({
  detail,
}))(ArticleAchor);
