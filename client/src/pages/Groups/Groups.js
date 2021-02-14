import React, { useState } from 'react';
import './Groups.css';

import { GroupsCard } from '../../components/GroupsCard/GroupsCard';
import { Input } from '../../components/UI/Input/Input';
import { ModalGroupInfo } from '../../components/ModalGroupInfo/ModalGroupInfo';
import { Button } from "../../components/UI/Button/Button";
import { Modal } from "../../components/Modal/Modal";

export default function Groups(props) {
    const [active, setActive] = useState(false);
    const [createGroup, setCreateGroup] = useState(false)

    const mapToGroups = props.user.groups.map(g => {
        return <GroupsCard
                name={g.groupId.name}
                groupPhoto={g.groupId.groupPhoto}
                descr={g.groupId.description}
                pathname={g.groupId.pathname}
                followers={g.groupId.followers}
                setActive={setActive}
                _id={g.groupId._id}
                key={g._id}
                onClick={() => setActive(g)}
            />
    })

    return (
        <>
            <Modal active={createGroup} setActive={setCreateGroup} />
            <ModalGroupInfo active={active} setActive={setActive} />
            <div className="groups-page">
                <div className="groups-rof">
                    <Input placeholder={'Поиск группы'} />
                    <Button onClick={() => setCreateGroup(true)} />
                </div>
                <div className="groups">
                    {mapToGroups}
                </div>
            </div>
        </>
    );
}
